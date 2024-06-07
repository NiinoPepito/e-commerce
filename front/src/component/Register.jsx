import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setValidationMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });

            if (response.ok) {
                setValidationMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                const data = await response.json();
                setValidationMessage(data.message || 'Erreur lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Error:', error);
            setValidationMessage('Erreur lors de l\'inscription.');
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center -mt-10">
            <div className="bg-gray-700 p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center text-white">Inscription</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="first-name">
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="last-name">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline text-purple-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-200 text-sm font-bold mb-1" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8 text-purple-400"
                            placeholder="Enter your password"
                            required
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline pr-8 text-purple-400"
                            placeholder="Confirm your password"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 top-6 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    {validationMessage && (
                        <div className="mb-4 text-center text-white">
                            {validationMessage}
                        </div>
                    )}
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
