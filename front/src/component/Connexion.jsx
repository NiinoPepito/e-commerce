import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Connexion = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('loginSuccess', 'Connexion reussie');
            window.location.href = '/profil';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
            <div className="bg-gray-700 p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center text-white">Connexion</h1>
                <form>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8 text-purple-400"
                            placeholder="Enter your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-purple-700 hover:bg-purple-950 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mb-2"
                        >
                            Se connecter
                        </button>
                        <Link
                            to="/inscription"
                            className="text-purple-200 hover:text-purple-400 font-bold focus:outline-none focus:shadow-outline text-sm"
                        >
                            Vous n'avez pas de compte ?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Connexion;
