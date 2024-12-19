import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, TextInput, Label, Alert, Spinner, Select } from 'flowbite-react';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', sellerId: '' });
    const [sellers, setSellers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchProducts();
        fetchSellers();
    }, []);

    const fetchProducts = async () => {
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
    };

    const fetchSellers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/sellers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSellers(response.data);
        } catch (error) {
            setError('Error fetching sellers.');
        }
    };

    const handleCreateProduct = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/products', newProduct, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: '', description: '', sellerId: '' });
        } catch (error) {
            setError('Error creating product.');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchProducts();
        } catch (error) {
            setError('Error deleting product.');
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/products/${productToUpdate.id}`, newProduct, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(products.map(product => product.id === productToUpdate.id ? response.data : product));
            setIsUpdating(false);
            setNewProduct({ name: '', price: '', description: '', sellerId: '' });
        } catch (error) {
            setError('Error updating product.');
        }
    };

    const handleEditProduct = (product) => {
        setIsUpdating(true);
        setProductToUpdate(product);
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            sellerId: product.seller?.id || ''
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-3xl font-bold mb-6">Product Management</h3>

            {error && <Alert color="failure">{error}</Alert>}

            <div className="mb-6">
                <Label htmlFor="productName" value="Product Name" />
                <TextInput
                    id="productName"
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    className="mb-4"
                />

                <Label htmlFor="price" value="Price" />
                <TextInput
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    className="mb-4"
                />

                <Label htmlFor="description" value="Description" />
                <TextInput
                    id="description"
                    type="text"
                    placeholder="Enter product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    className="mb-4"
                />

                <Label htmlFor="seller" value="Seller" />
                <select
                    id="seller"
                    value={newProduct.sellerId}
                    onChange={(e) => setNewProduct({ ...newProduct, sellerId: e.target.value })}
                    required
                    className="form-select"
                >
                    <option value="" disabled>Select a seller</option>
                    {sellers.map((seller) => (
                        <option key={seller.id} value={seller.id}>
                            {seller.name}
                        </option>
                    ))}
                </select>

                {isUpdating ? (
                    <Button gradientDuoTone="greenToBlue" onClick={handleUpdateProduct} className="mt-4">
                        Update Product
                    </Button>
                ) : (
                    <Button gradientDuoTone="cyanToBlue" onClick={handleCreateProduct} className="mt-4">
                        Add Product
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner aria-label="Loading..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Card key={product.id} className="p-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                                {product.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                Price: ${product.price}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                Description: {product.description}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Seller: {product.seller?.name || 'Unknown'}
                            </p>
                            <div className="mt-4 flex space-x-2">
                                <Button gradientDuoTone="redToYellow" onClick={() => handleDeleteProduct(product.id)}>
                                    Delete
                                </Button>
                                <Button gradientDuoTone="purpleToPink" onClick={() => handleEditProduct(product)}>
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

export default ProductManagement;
