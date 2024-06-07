import React, { useState } from 'react';

const DeleteProducts = () => {
    // Example product list
    const products = [
        { id: 1, title: 'Smartphone XYZ', description: 'A great smartphone.', color: 'Black', price: '499.99', image: 'https://via.placeholder.com/300' },
        { id: 2, title: 'Laptop ABC', description: 'A powerful laptop.', color: 'Silver', price: '999.99', image: 'https://via.placeholder.com/300' },
        // Add more products as needed
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductChange = (e) => {
        const productId = parseInt(e.target.value);
        const product = products.find(p => p.id === productId);
        setSelectedProduct(product);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            console.log('Product deleted:', selectedProduct);
            // Here you can add your logic to delete this data from your backend
            setSelectedProduct(null); // Reset the selected product
        }
    };

    return (
        <div className={`flex items-center justify-center bg-[#242424] ${selectedProduct ? 'h-[calc(100vh-15rem)]' : 'h-[calc(100vh-33rem)]'}`}>
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Delete Product</h1>
                <form onSubmit={handleDelete} className="space-y-4">
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
                        <div className="bg-gray-700 p-4 rounded-md">
                            <p className="text-lg font-bold">{selectedProduct.title}</p>
                            <p>{selectedProduct.description}</p>
                            <p>Color: {selectedProduct.color}</p>
                            <p>Price: ${selectedProduct.price}</p>
                            <img src={selectedProduct.image} alt={selectedProduct.title} className="mt-2 max-h-32" />
                        </div>
                    )}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Delete Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteProducts;
