import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [isMessageVisible, setMessageVisibility] = useState(false);

    useEffect(() => {
        // Fetch products from API
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                const sortedProducts = response.data.sort((a, b) => a.id - b.id);
                setProducts(sortedProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleProductChange = (e) => {
        const productId = parseInt(e.target.value);
        const product = products.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            setTitle(product.title);
            setDescription(product.description);
            setColor(product.color);
            setPrice(product.price);
            setImage(product.image);
        } else {
            setSelectedProduct(null);
            setTitle('');
            setDescription('');
            setColor('');
            setPrice('');
            setImage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            const updatedProduct = {
                title,
                description,
                color,
                price: parseInt(price), // Convert price to int
                image
            };

            // Update product via API
            axios.put(`http://localhost:8000/api/products/${selectedProduct.id}`, updatedProduct)
                .then(response => {
                    console.log('Product updated:', response.data);
                    setUpdateMessage('Product updated successfully.');
                    setMessageVisibility(true);

                    // Update the product list with the updated product
                    setProducts(products.map(p => p.id === selectedProduct.id ? response.data : p));
                    setSelectedProduct(response.data);

                    // Hide message after 3 seconds
                    setTimeout(() => {
                        setUpdateMessage('');
                        setMessageVisibility(false);
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        }
    };

    return (
        <div className={`flex items-center justify-center bg-[#242424] ${selectedProduct ? 'h-[calc(100vh-15rem)]' : 'h-[calc(100vh-36rem)]'}`}>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Modifier un produit</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">Titre</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Titre du produit"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="color">Couleur</label>
                                    <input
                                        type="text"
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Couleur du produit"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">Prix</label>
                                    <input
                                        type="text"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Prix du produit"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
                                    <input
                                        type="text"
                                        id="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="URL de l'image"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Description du produit"
                                    required
                                ></textarea>
                            </div>
                            {updateMessage && isMessageVisible && (
                                <div className="bg-green-500 text-white p-4 rounded-md text-center absolute top-12 left-0 right-0 mt-4">
                                    {updateMessage}
                                </div>
                            )}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Modifier
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateProducts;
