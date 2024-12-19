import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Badge, Spinner, Alert } from 'flowbite-react';

const FavoriteList = () => {
    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchFavoriteList();
    }, []);

    const fetchFavoriteList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/favorites/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const favoriteProducts = response.data.length > 0 ? response.data[0].products : [];
            setFavorites(favoriteProducts);
        } catch (error) {
            setError('Error fetching favorite list.');
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
            <h3 className="text-2xl font-bold mb-4">Favorite Products</h3>

            {error && <Alert color="failure">{error}</Alert>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <Card key={product.id} className="flex flex-col p-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                                {product.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                                Seller: {product.seller.name}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                                Price: ${product.price}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
                                {product.description}
                            </p>
                            <div className="mt-auto">
                                <Badge color="info">Favorite</Badge>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No products found in your favorite list.</p>
                )}
            </div>
        </div>
    );
};

export default FavoriteList;
