import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Order = () => {
    const [order, setOrder] = useState(null);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [showBillingForm, setShowBillingForm] = useState(false);
    const [showCheckoutButton, setShowCheckoutButton] = useState(true);
    const [deliveryValidationMessage, setDeliveryValidationMessage] = useState('');
    const [billingValidationMessage, setBillingValidationMessage] = useState('');
    const [paymentValidationMessage, setPaymentValidationMessage] = useState('');
    const [billingUpdated, setBillingUpdated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/connexion');
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/orders/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchOrder();
    }, [navigate]);

    const handleUpdateDelivery = () => {
        setShowDeliveryForm(true);
        setShowCheckoutButton(false);
    };

    const handleSubmitDelivery = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const shippingAddress = event.target.elements.shippingAddress.value;
        const shippingMethod = event.target.elements.shippingMethod.value;

        if (!shippingAddress || !shippingMethod) {
            setDeliveryValidationMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/shipping`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ shippingAddress, shippingMethod }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setShowBillingForm(true);
            setDeliveryValidationMessage('Adresse de livraison et méthode de paiement mises à jour avec succès.');
        } catch (error) {
            console.error('Error updating delivery:', error);
            setDeliveryValidationMessage('Erreur lors de la mise à jour de l\'adresse de livraison et méthode de paiement.');
        }
    };

    const handleSubmitInvoiceAddress = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        const invoiceAddress = event.target.elements.billingAddress.value;

        if (!invoiceAddress) {
            setBillingValidationMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/invoice-address`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ invoiceAddress }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setBillingValidationMessage('Adresse de facturation mise à jour avec succès.');
            setBillingUpdated(true);
        } catch (error) {
            console.error('Error updating billing:', error);
            setBillingValidationMessage('Erreur lors de la mise à jour de l\'adresse de facturation.');
        }
    };

    const handlePayOrder = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${order.id}/pay`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setPaymentValidationMessage('Commande payée avec succès.');
        } catch (error) {
            console.error('Error paying order:', error);
            setPaymentValidationMessage('Erreur lors du paiement de la commande.');
        }
    };

    let totalOrderPrice = 0;
    if (order) {
        totalOrderPrice = order.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    }

    return (
        <div className="container mx-auto p-4">
            {order && order.items.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item) => {
                            const totalPrice = item.product.price * item.quantity;
                            return (
                                <div key={item.id} className="border rounded p-4 flex">
                                    <img src={item.product.image} alt={item.product.title} className="max-h-48 mb-2 mr-4" />
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{item.product.title}</h2>
                                        <p className="text-gray-700 mb-2">{item.product.description}</p>
                                        <p className="text-xl font-bold mb-2">Prix Unitaire: {item.product.price} €</p>
                                        <p className="text-gray-700">Quantité: {item.quantity}</p>
                                        <p className="text-l font-bold">Prix Total: {totalPrice} €</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="col-span-2">
                            <h2 className="text-2xl font-bold mb-2">Prix total de la commande: {totalOrderPrice} €</h2>
                        </div>
                    </div>
                    {deliveryValidationMessage && (
                        <div className="mb-4 p-2 bg-green-200 text-green-800">
                            {deliveryValidationMessage}
                        </div>
                    )}
                    {showDeliveryForm && (
                        <div className="border rounded p-4 mt-4">
                            <h2 className="text-2xl font-bold mb-2">Adresse de livraison et méthode de paiement</h2>
                            <form onSubmit={handleSubmitDelivery}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Adresse de livraison:</label>
                                    <input type="text" name="shippingAddress" className="w-full p-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Méthode de paiement:</label>
                                    <select name="shippingMethod" className="w-full p-2 border rounded">
                                        <option value="creditCard">Carte de crédit</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bankTransfer">Virement bancaire</option>
                                    </select>
                                </div>
                        <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Mettre à jour
                        </button>
                        </div>
                        </form>
                        </div>
                        )}
                    {billingValidationMessage && (
                        <div className="mb-4 p-2 bg-green-200 text-green-800">
                            {billingValidationMessage}
                        </div>
                    )}
                    {showBillingForm && (
                        <div className="border rounded p-4 mt-4">
                            <h2 className="text-2xl font-bold mb-2">Adresse de facturation</h2>
                            <form onSubmit={handleSubmitInvoiceAddress}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Adresse:</label>
                                    <input type="text" name="billingAddress" className="w-full p-2 border rounded" />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        Mettre à jour
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {paymentValidationMessage && (
                        <div className="mb-4 p-2 bg-green-200 text-green-800">
                            {paymentValidationMessage}
                        </div>
                    )}
                    {showCheckoutButton && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleUpdateDelivery}
                            >
                                Valider ma commande
                            </button>
                        </div>
                    )}
                    {billingUpdated && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handlePayOrder}
                            >
                                Payer ma commande
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center text-xl mt-8">
                    <p>Votre commande est vide.</p>
                    <Link to="/products" className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Voir les produits
                    </Link>
                </div>
            )}
</div>
);
};

export default Order;
