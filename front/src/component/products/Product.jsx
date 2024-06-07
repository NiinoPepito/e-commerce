import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    // Données fictives du produit
    const product = {
        title: "Smartphone XYZ",
        description: "Un smartphone dernier cri avec des fonctionnalités avancées.",
        price: "$499.99",
        color: "Noir",
        image: "https://via.placeholder.com/300",
    };

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

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
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
