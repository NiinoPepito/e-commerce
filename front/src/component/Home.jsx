import React from 'react';
import { Link } from "react-router-dom";
import product1 from '../assets/funnnnnny.png';
import product2 from '../assets/funnnnnny.png';
import product3 from '../assets/funnnnnny.png';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-purple-900 text-white py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to FunShop</h1>
                <p className="text-xl mb-8">Discover the best products at unbeatable prices!</p>
                <Link to="/products" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded">
                    Shop Now
                </Link>
            </div>

            {/* Featured Products Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Product Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={product1} alt="Product 1" className="w-full h-48 object-cover mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Product 1</h3>
                            <p className="text-gray-700 mb-4">This is a great product. You should definitely buy it!</p>
                            <Link to="/products/1" className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                View Details
                            </Link>
                        </div>
                        {/* Product Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={product2} alt="Product 2" className="w-full h-48 object-cover mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Product 2</h3>
                            <p className="text-gray-700 mb-4">This product is amazing. Don't miss out!</p>
                            <Link to="/products/2" className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                View Details
                            </Link>
                        </div>
                        {/* Product Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={product3} alt="Product 3" className="w-full h-48 object-cover mb-4"/>
                            <h3 className="text-xl font-bold mb-2">Product 3</h3>
                            <p className="text-gray-700 mb-4">You'll love this product. It's a must-have!</p>
                            <Link to="/products/3" className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-purple-900 text-white py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Special Offer!</h2>
                <p className="text-xl mb-8">Get 20% off on your first order. Use code FIRST20 at checkout.</p>
                <Link to="/products" className="bg-white hover:bg-gray-200 text-fuchsia-500 font-bold py-2 px-4 rounded">
                    Shop Now
                </Link>
            </div>

            {/* Newsletter Signup */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
                    <p className="text-xl mb-8">Sign up for our newsletter to get the latest updates and offers.</p>
                    <form className="flex justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
