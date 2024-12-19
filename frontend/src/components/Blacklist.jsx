import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Button, Badge, Spinner, Alert } from 'flowbite-react';

const Blacklist = () => {
    const { userId } = useParams();
    const [blacklist, setBlacklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchBlacklist();
    }, []);

    const fetchBlacklist = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/blacklist/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Response verisini doğru şekilde işliyoruz
            const blacklistedSellers = response.data.length > 0 ? response.data[0].sellers : []; 
            setBlacklist(blacklistedSellers);
        } catch (error) {
            setError('Error fetching blacklist.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner aria-label="Loading..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-2xl font-bold mb-4">Blacklisted Sellers</h3>

            {error && <Alert color="failure">{error}</Alert>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blacklist.length > 0 ? (
                    blacklist.map((seller) => (
                        <Card key={seller.id} className="flex flex-col p-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                                {seller.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Contact: {seller.email}
                            </p>
                            <div className="mt-auto">
                                <Badge color="failure">Blacklisted</Badge>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No sellers found in blacklist.</p>
                )}
            </div>
        </div>
    );
};

export default Blacklist;
