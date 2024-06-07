import React, { useState, useEffect } from 'react';

const CreateProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [createMessage, setCreateMessage] = useState('');
    const [isMessageVisible, setMessageVisibility] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convertir le prix en nombre
        const priceAsNumber = parseFloat(price);
        const product = { title, description, color, price: priceAsNumber, image };

        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                console.log('Product created successfully:', product);
                setCreateMessage('Product created successfully.');
                setMessageVisibility(true);
                // Réinitialisation des champs après création réussie
                setTitle('');
                setDescription('');
                setColor('');
                setPrice('');
                setImage('');
            } else {
                console.error('Failed to create product:', response.statusText);
                setCreateMessage('Failed to create product. Please try again.');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            setCreateMessage('An error occurred while creating the product. Please try again later.');
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
        <div className="h-[calc(100vh-20rem)] flex items-center justify-center bg-[#242424]">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Create Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    {createMessage && isMessageVisible && (
                        <div className="bg-green-500 text-white p-4 rounded-md text-center absolute top-12 left-0 right-0 mt-4">
                            {createMessage}
                        </div>
                    )}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProducts;
