import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextInput, Card, Badge, Alert, Spinner } from 'flowbite-react';

const AdminPanel = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const userResponse = await axios.get(`http://localhost:8080/api/users/search?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const productResponse = await axios.get(`http://localhost:8080/api/products/search?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const sellerResponse = await axios.get(`http://localhost:8080/api/sellers/search?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const combinedResults = [
                ...userResponse.data.map(user => ({ ...user, type: 'User' })),
                ...productResponse.data.map(product => ({ ...product, type: 'Product' })),
                ...sellerResponse.data.map(seller => ({ ...seller, type: 'Seller' }))
            ];

            setSearchResults(combinedResults);
        } catch (error) {
            setError('Error searching for results.');
        } finally {
            setLoading(false);
        }
    };

    const handleUserManagement = () => {
        navigate('/admin/user-management');
    };

    const handleProductManagement = () => {
        navigate('/admin/product-management');
    };

    const handleSellerManagement = () => {
        navigate('/admin/seller-management');
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-3xl font-bold mb-6">Admin Panel</h3>

            <div className="mb-6">
                <TextInput
                    id="search"
                    type="text"
                    placeholder="Search Users, Products, Sellers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Button gradientDuoTone="cyanToBlue" onClick={handleUserManagement} fullSized>
                    User Management
                </Button>
                <Button gradientDuoTone="greenToBlue" onClick={handleProductManagement} fullSized>
                    Product Management
                </Button>
                <Button gradientDuoTone="purpleToPink" onClick={handleSellerManagement} fullSized>
                    Seller Management
                </Button>
            </div>

            <h4 className="text-2xl font-semibold mb-4">Search Results</h4>

            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner aria-label="Loading..." />
                </div>
            )}

            {error && <Alert color="failure">{error}</Alert>}

            {!loading && searchResults.length > 0 && (
                <div className="space-y-4">
                    {searchResults.map((result, index) => (
                        <Card key={index} className="p-4">
                            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                {result.username || result.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {result.role || result.description || result.email}
                            </p>
                            <Badge color="info" className="mt-2">{result.type}</Badge>
                        </Card>
                    ))}
                </div>
            )}

            {!loading && searchResults.length === 0 && !error && (
                <p className="text-gray-500">No results found.</p>
            )}
        </div>
    );
};

export default AdminPanel;
