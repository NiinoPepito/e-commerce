import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                // Sélectionner trois produits aléatoires
                const shuffledProducts = shuffleArray(data);
                const selectedProducts = shuffledProducts.slice(0, 3);
                setFeaturedProducts(selectedProducts);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    // Fonction pour mélanger un tableau aléatoirement
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-purple-900 text-white py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Bienvenue sur FunShop</h1>
                <p className="text-xl mb-8">Découvrez les meilleurs produits à des prix imbattables !</p>
                <Link to="/products" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded">
                    Voir nos produits
                </Link>
            </div>

            {/* Featured Products Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Quelques produits en vedette</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4"/>
                                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                                <p className="text-gray-700 mb-4">{product.description}</p>
                                <Link to={`/product/${product.id}`} className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                    Voir le produit
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
