import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profil = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/connexion');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!user) {
        return <div>Utilisateur non trouvé</div>;
    }

    return (
        <div className="flex justify-center mt-8">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-4 py-2">
                    <h1 className="text-gray-900 font-bold text-3xl">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profil;
