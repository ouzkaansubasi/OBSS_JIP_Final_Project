import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, TextInput, Badge, Spinner, Alert, Modal } from 'flowbite-react';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineTrash, HiOutlineExclamation, HiOutlineStar } from "react-icons/hi";

const UserPanel = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token && userId) {
            fetchProducts();
        } else {
            setError('No token or userId found, redirecting to login');
            navigate('/login');
        }
    }, [token, userId, navigate, fetchProducts]);

    const addToFavorites = async (productId) => {
        try {
            const url = `http://localhost:8080/api/favorites/${userId}/products/${productId}`;
            await axios.post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProducts();
            setModalContent('Product added to favorites!');
            setShowModal(true);
        } catch (error) {
            setError('Error adding to favorite list.');
        }
    };

    const removeFromFavorites = async (productId) => {
        try {
            const url = `http://localhost:8080/api/favorites/${userId}/products/${productId}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProducts();
            setModalContent('Product removed from favorites.');
            setShowModal(true);
        } catch (error) {
            setError('Error removing from favorite list.');
        }
    };

    const addToBlacklist = async (sellerId) => {
        try {
            const url = `http://localhost:8080/api/blacklist/${userId}/sellers/${sellerId}`;
            await axios.post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProducts();
            setModalContent('Seller added to blacklist.');
            setShowModal(true);
        } catch (error) {
            setError('Error adding to blacklist.');
        }
    };

    const removeFromBlacklist = async (sellerId) => {
        try {
            const url = `http://localhost:8080/api/blacklist/${userId}/sellers/${sellerId}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProducts();
            setModalContent('Seller removed from blacklist.');
            setShowModal(true);
        } catch (error) {
            setError('Error removing from blacklist.');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/search?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            setError('Error searching products.');
        }
    };

    const goToFavorites = () => {
        navigate(`/favorites/${userId}`);
    };

    const goToBlacklist = () => {
        navigate(`/blacklist/${userId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner aria-label="Loading..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-fixed" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?nature,light')` }}>
            <div className="backdrop-filter backdrop-blur-lg min-h-screen bg-white bg-opacity-75 p-6">
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">Product List</h3>

                <div className="mb-6 flex justify-center">
                    <TextInput
                        type="text"
                        placeholder="Search Products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        addon={<HiOutlineSearch />}
                        className="w-full max-w-md"
                    />
                </div>

                {error && <Alert color="failure" className="mb-6">{error}</Alert>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex flex-col">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {product.name}
                            </h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Seller: {product.seller ? product.seller.name : 'Unknown Seller'}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge color="info">Price: ${product.price}</Badge>
                                <Badge color="success">{product.category}</Badge>
                            </div>
                            <div className="mt-auto flex flex-col gap-2">
                                <Button color="light" onClick={() => addToFavorites(product.id)} icon={<HiOutlineHeart />}>
                                    Add to Favorites
                                </Button>
                                <Button color="failure" onClick={() => removeFromFavorites(product.id)} icon={<HiOutlineTrash />}>
                                    Remove from Favorites
                                </Button>
                                <Button color="warning" onClick={() => addToBlacklist(product.sellerId)} icon={<HiOutlineExclamation />}>
                                    Add to Blacklist
                                </Button>
                                <Button color="dark" onClick={() => removeFromBlacklist(product.sellerId)} icon={<HiOutlineTrash />}>
                                    Remove from Blacklist
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <Button color="info" onClick={goToFavorites} icon={<HiOutlineStar />}>
                        View Favorite List
                    </Button>
                    <Button color="warning" onClick={goToBlacklist} icon={<HiOutlineExclamation />}>
                        View Blacklist
                    </Button>
                </div>

                {/* Modal for Notifications */}
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header>
                        Notification
                    </Modal.Header>
                    <Modal.Body>
                        <p>{modalContent}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default UserPanel;
