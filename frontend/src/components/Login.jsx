import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Card, Label, Checkbox, Alert } from 'flowbite-react';
import { HiLockClosed } from "react-icons/hi";
import 'flowbite';
import 'flowbite-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                username,
                password,
            });

            const { role, accessToken, refreshToken, id } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', id);

            if (role === 'ADMIN') {
                navigate('/admin-panel');
            } else if (role === 'USER') {
                navigate('/user-panel');
            } else {
                setError('Bilinmeyen kullanıcı rolü!');
            }

        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <HiLockClosed className="text-5xl text-purple-600" />
                </div>
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Login</h1>
                {error && <Alert color="failure" className="mb-4">{error}</Alert>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <Label htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="ml-2 cursor-pointer">
                                Remember me
                            </Label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Button type="submit" gradientDuoTone="purpleToPink" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
