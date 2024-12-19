import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, TextInput, Label, Alert, Spinner } from 'flowbite-react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/users?role=USER', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
                role: 'USER'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccess('User added successfully');
            setError('');
            setUsername('');
            setPassword('');
            fetchUsers();
        } catch (error) {
            setError('Failed to add user');
            setSuccess('');
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (error) {
            setError('Error deleting user.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-3xl font-bold mb-6">User Management</h3>

            <div className="mb-6">
                <Label htmlFor="username" value="Username" />
                <TextInput
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mb-4"
                />

                <Label htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-4"
                />

                <Button gradientDuoTone="cyanToBlue" onClick={handleAddUser} className="mt-4">
                    Add User
                </Button>

                {error && <Alert color="failure" className="mt-4">{error}</Alert>}
                {success && <Alert color="success" className="mt-4">{success}</Alert>}
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner aria-label="Loading..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <Card key={user.id} className="p-4">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                                {user.username}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
                                Role: {user.role}
                            </p>
                            <Button gradientDuoTone="redToYellow" onClick={() => handleDeleteUser(user.id)}>
                                Delete
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserManagement;
