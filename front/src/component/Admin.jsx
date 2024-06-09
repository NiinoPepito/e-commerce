import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProducts from './products/CreateProducts';
import UpdateProducts from './products/UpdateProducts';
import DeleteProducts from './products/DeleteProducts';

const Admin = () => {
    const [selectedForm, setSelectedForm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/connexion');
        }
    }, [navigate]);

    const showForm = (form) => {
        setSelectedForm(form);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
                <div className="flex justify-center space-x-4 mb-4">
                    <button onClick={() => showForm('create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer un produit</button>
                    <button onClick={() => showForm('update')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Modifier un produit</button>
                    <button onClick={() => showForm('delete')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Supprimer un produit</button>
                </div>
                <div className="mt-8">
                    {selectedForm === 'create' && <CreateProducts />}
                    {selectedForm === 'update' && <UpdateProducts />}
                    {selectedForm === 'delete' && <DeleteProducts />}
                </div>
            </div>
        </div>
    );
};

export default Admin;
