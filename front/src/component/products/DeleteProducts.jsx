import React, { useState, useEffect } from 'react';

const DeleteProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isMessageVisible, setMessageVisibility] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                // Tri des produits par ID
                const sortedProducts = data.sort((a, b) => a.id - b.id);
                setProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts().then(r => console.log(r));
    }, []);

    const handleProductChange = (e) => {
        const productId = parseInt(e.target.value);
        const product = products.find(p => p.id === productId);
        setSelectedProduct(product);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (selectedProduct) {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${selectedProduct.id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Product deleted:', selectedProduct);
                    // Mise à jour de la liste des produits après suppression
                    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
                    setProducts(updatedProducts);
                    setSelectedProduct(null); // Réinitialisation du produit sélectionné
                    setDeleteMessage('Product deleted successfully.');
                    setMessageVisibility(true);
                    // Affichage du message pendant 2 secondes
                    setTimeout(() => {
                        setDeleteMessage('');
                    }, 2000);
                } else {
                    console.error('Failed to delete product:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    useEffect(() => {
        let timer;
        if (isMessageVisible) {
            timer = setTimeout(() => {
                setMessageVisibility(false);
            }, 3000); // Change the timeout value as per your requirement (3 seconds here)
        }
        return () => clearTimeout(timer);
    }, [isMessageVisible]);

    return (
        <div className={`flex items-center justify-center bg-[#242424] ${selectedProduct ? 'h-[calc(100vh-15rem)]' : 'h-[calc(100vh-36rem)]'}`}>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Supprimer un produit</h1>
                <form onSubmit={handleDelete} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="product">Sélectionner un produit</label>
                        <select
                            id="product"
                            onChange={handleProductChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Sélectionner un produit</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>ID : {product.id} | {product.title}</option>
                            ))}
                        </select>
                    </div>
                    {selectedProduct && (
                        <>
                            <div className="bg-gray-700 p-4 rounded-md">
                                <p className="text-lg font-bold">{selectedProduct.title}</p>
                                <p>{selectedProduct.description}</p>
                                <p>Color: {selectedProduct.color}</p>
                                <p>Price: ${selectedProduct.price}</p>
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="mt-2 max-h-32" />
                            </div>
                            {deleteMessage && isMessageVisible && (
                                <div className="bg-green-500 text-white p-4 rounded-md text-center absolute top-12 left-0 right-0 mt-4">
                                    {deleteMessage}
                                </div>
                            )}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default DeleteProducts;
