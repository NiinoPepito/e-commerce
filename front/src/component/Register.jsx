import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center -mt-10">
            <div className="bg-gray-700 p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center text-white">Inscription</h1>
                <form>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="first-name">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="last-name">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
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
                    <div className="mb-4 relative">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="confirm-password">
                            Confirmer le Mot de passe
                        </label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirm-password"
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8 text-purple-400"
                            placeholder="Confirm your password"
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-purple-700 hover:bg-purple-950 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mb-2"
                        >
                            Créer mon compte
                        </button>
                        <Link
                            to="/connexion"
                            className="text-purple-200 hover:text-purple-400 font-bold focus:outline-none focus:shadow-outline text-sm"
                        >
                            Vous avez déjà un compte ?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
