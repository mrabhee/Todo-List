import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../Appwrite/config'
import { ID } from 'appwrite';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const nav = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill in all fields');
        } else {
            // Submit the form data to the server
            try {
                await account.create(ID.unique(), email, password, name)
                nav('/')
            } catch (error) {
                console.log(error)
            }
        }
    };


    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 w-1/2">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <div className="flex items-center mt-2">
                        <input
                            id="show-password"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-2"
                        />
                        <label htmlFor="show-password" className="text-gray-700 text-sm my-2">
                            Show Password
                        </label>
                    </div>
                </div>
                {error && (
                    <div className="mb-4">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <button
                className='text-orange-500 m-2 underline'
                onClick={() => nav('/')}>Already have an account</button>
        </div>
    );
}

export default Register;