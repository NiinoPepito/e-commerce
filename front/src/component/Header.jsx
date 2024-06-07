import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHome, FaBoxOpen } from 'react-icons/fa'; // Import the additional icons
import fun from '../assets/funnnnnny.png';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // État local pour gérer l'affichage du menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // État pour gérer la connexion de l'utilisateur
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Gestion de l'état de connexion lors du chargement initial
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        window.location.href = '/connexion';
    };

    // Gestion de la fermeture du menu lorsque l'utilisateur clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="flex items-center justify-between p-4 bg-purple-900 text-white w-full top-0">
            <div className="flex items-center">
                <img src={fun} alt="Logo" className="mr-4 w-14 h-14"/>
                <h1 className="text-xl font-bold">FunShop</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className={`hover:bg-purple-950 rounded-md px-3 py-1.5 inline-flex items-center ${currentPath === '/' ? 'text-fuchsia-500' : ''}`}>
                            <FaHome className="mr-2" /> Accueil
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={`hover:bg-purple-950 rounded-md px-3 py-1.5 inline-flex items-center ${currentPath === '/products' ? 'text-fuchsia-500' : ''}`}>
                            <FaBoxOpen className="mr-2" /> Produits
                        </Link>
                    </li>
                    <li>
                        <Link to="/order" className={`hover:bg-purple-950 rounded-md px-3 py-1.5 inline-flex items-center ${currentPath === '/order' ? 'text-fuchsia-500' : ''}`}>
                            <FaShoppingCart className="mr-2" /> Panier
                        </Link>
                    </li>
                    {/* Menu utilisateur */}
                    <li>
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                                <FaUser className="mr-2 mt-2.5" />
                            </button>
                            {/* Affichage conditionnel du menu déroulant */}
                            {isMenuOpen && (
                                <ul className="absolute top-10 right-0 bg-purple-800 text-white rounded-md p-2 border-2 border-purple-400">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <button onClick={handleLogout} className="hover:text-fuchsia-500">
                                                    Déconnexion
                                                </button>
                                            </li>
                                            <li>
                                                <Link to="/profil" className={`hover:text-fuchsia-500 ${currentPath === '/profil' ? 'text-fuchsia-500' : ''}`}>
                                                    Profil
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin" className={`hover:text-fuchsia-500 ${currentPath === '/admin' ? 'text-fuchsia-500' : ''}`}>
                                                    Admin
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link to="/connexion" className={`hover:text-fuchsia-500 ${currentPath === '/connexion' ? 'text-fuchsia-500' : ''}`}>
                                                Connexion
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
