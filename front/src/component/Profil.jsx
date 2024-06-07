import React from 'react';

const Profil = () => {
    // Supposons que vous avez des informations sur l'utilisateur et sa dernière commande
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        // Autres informations...
    };

    const lastOrder = {
        id: 123456,
        date: "2024-06-06",
        total: 50.00,
        products: [
            { name: "Product 1", price: 20.00 },
            { name: "Product 2", price: 15.00 },
            { name: "Product 3", price: 10.00 },
            // Ajoutez d'autres produits ici
        ]
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-4 py-2">
                    <h1 className="text-gray-900 font-bold text-3xl">{user.name}</h1>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-gray-600 mt-1">Age: {user.age}</p>
                    {/* Ajoutez d'autres informations de l'utilisateur ici */}
                </div>
            </div>
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden ml-4">
                <div className="px-4 py-2">
                    <h1 className="text-gray-900 font-bold text-2xl">Dernière Commande</h1>
                    <p className="text-gray-600 mt-1">ID: {lastOrder.id}</p>
                    <p className="text-gray-600 mt-1">Date: {lastOrder.date}</p>
                    <p className="text-gray-600 mt-1">Total: ${lastOrder.total}</p>
                    <h2 className="text-gray-900 font-bold text-lg mt-4">Produits:</h2>
                    <ul className="list-disc pl-4">
                        {lastOrder.products.map((product, index) => (
                            <li key={index} className="text-gray-600">{product.name}: ${product.price}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profil;
