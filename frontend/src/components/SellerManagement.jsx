import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, TextInput, Label, Alert, Spinner } from 'flowbite-react';

const SellerManagement = () => {
    const [sellers, setSellers] = useState([]);
    const [newSeller, setNewSeller] = useState({ name: '', email: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [sellerToUpdate, setSellerToUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/sellers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSellers(response.data);
        } catch (error) {
            setError('Error fetching sellers.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSeller = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/sellers', newSeller, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSellers([...sellers, response.data]);
            setNewSeller({ name: '', email: '' });
        } catch (error) {
            setError('Error creating seller.');
        }
    };

    const handleDeleteSeller = async (sellerId) => {
        try {
            await axios.delete(`http://localhost:8080/api/sellers/${sellerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchSellers();
        } catch (error) {
            setError('Error deleting seller.');
        }
    };

    const handleUpdateSeller = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/sellers/${sellerToUpdate.id}`, newSeller, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSellers(sellers.map(seller => seller.id === sellerToUpdate.id ? response.data : seller));
            setIsUpdating(false);
            setNewSeller({ name: '', email: '' });
        } catch (error) {
            setError('Error updating seller.');
        }
    };

    const handleEditSeller = (seller) => {
        setIsUpdating(true);
        setSellerToUpdate(seller);
        setNewSeller({
            name: seller.name,
            email: seller.email
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-3xl font-bold mb-6">Seller Management</h3>

            {error && <Alert color="failure">{error}</Alert>}

            <div className="mb-6">
                <Label htmlFor="sellerName" value="Seller Name" />
                <TextInput
                    id="sellerName"
                    type="text"
                    placeholder="Enter seller name"
                    value={newSeller.name}
                    onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                    required
                    className="mb-4"
                />

                <Label htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter seller email"
                    value={newSeller.email}
                    onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                    required
                    className="mb-4"
                />

                {isUpdating ? (
                    <Button gradientDuoTone="greenToBlue" onClick={handleUpdateSeller} className="mt-4">
                        Update Seller
                    </Button>
                ) : (
                    <Button gradientDuoTone="cyanToBlue" onClick={handleCreateSeller} className="mt-4">
                        Add Seller
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner aria-label="Loading..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sellers.map((seller) => (
                        <Card key={seller.id} className="p-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                                {seller.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                Email: {seller.email}
                            </p>
                            <div className="mt-4 flex space-x-2">
                                <Button gradientDuoTone="redToYellow" onClick={() => handleDeleteSeller(seller.id)}>
                                    Delete
                                </Button>
                                <Button gradientDuoTone="purpleToPink" onClick={() => handleEditSeller(seller)}>
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerManagement;
