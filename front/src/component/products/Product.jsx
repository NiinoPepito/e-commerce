import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            setErrorMessage('Veuillez vous connecter pour ajouter des produits au panier.');
            setTimeout(() => setErrorMessage(''), 3000);  // Clear the message after 3 seconds
            return;
        }

        const orderData = {
            productId: parseInt(id, 10),  // Convert the product ID to an integer
            quantity: quantity,
        };

        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Order successful:', data);
            setSuccessMessage('Produit ajouté au panier avec succès!');
            setTimeout(() => setSuccessMessage(''), 3000);  // Clear the message after 3 seconds
        } catch (error) {
            console.error('Error submitting order:', error);
            setErrorMessage('Une erreur est survenue lors de l\'ajout au panier.');
            setTimeout(() => setErrorMessage(''), 3000);  // Clear the message after 3 seconds
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-purple-600 text-3xl absolute left-4 cursor-pointer" onClick={() => window.history.back()} />
                    <img src={product.image} alt={product.title} className="max-h-96" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-bold mb-2">{product.price}</p>
                    <p className="text-gray-700 mb-2">Couleur: {product.color}</p>
                    <div className="flex items-center mb-4">
                        <button onClick={decreaseQuantity} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l">
                            -
                        </button>
                        <span className="bg-gray-200 text-gray-700 py-2 px-4">{quantity}</span>
                        <button onClick={increaseQuantity} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r">
                            +
                        </button>
                    </div>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            onClick={handleSubmit}>
                        Ajouter au panier
                    </button>
                    {successMessage && (
                        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
