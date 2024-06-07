import React, { useState } from 'react';

const UpdateProducts = () => {
    // Example product list
    const products = [
        { id: 1, title: 'Smartphone XYZ', description: 'A great smartphone.', color: 'Black', price: '499.99', image: 'https://via.placeholder.com/300' },
        { id: 2, title: 'Laptop ABC', description: 'A powerful laptop.', color: 'Silver', price: '999.99', image: 'https://via.placeholder.com/300' },
        // Add more products as needed
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

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
            const updatedProduct = { ...selectedProduct, title, description, color, price, image };
            console.log('Product updated:', updatedProduct);
            // Here you can add your logic to send this data to your backend
        }
    };

    return (
        <div className={`flex items-center justify-center bg-[#242424] ${selectedProduct ? 'h-[calc(100vh-15rem)]' : 'h-[calc(100vh-36rem)]'}`}>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Update Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="product">Select Product</label>
                        <select
                            id="product"
                            onChange={handleProductChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.title}</option>
                            ))}
                        </select>
                    </div>
                    {selectedProduct && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="color">Color</label>
                                    <input
                                        type="text"
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product color"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter product price"
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
                                        placeholder="Enter product image URL"
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
                                    placeholder="Enter product description"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover
                                    bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Product
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
