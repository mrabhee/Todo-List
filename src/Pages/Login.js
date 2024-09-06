import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../Appwrite/config';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                if (session.status) {
                    setIsSessionActive(true);
                } else {
                    setIsSessionActive(false);
                }
            } catch (error) {
                console.log(error);
                setIsSessionActive(false);
            }
        };
        checkSession();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
        } else {
            // Submit the form data to the server
            createAcc()
        }
    };

    const createAcc = async () => {
        try {
            if (isSessionActive) {
                await account.deleteSession('current').then(() => {
                    account.createEmailPasswordSession(email, password).then(() => {
                        nav('/Application')
                    })
                })
            } else {
                await account.createEmailPasswordSession(email, password).then(() => {
                    nav('/Application')
                })
            }

        } catch (error) {
            console.log(error)
            if (error.message.includes("invalid credentials") || error.message.includes("user not found")) {
                alert("Invalid email or password. Please try again.")
            } else {
                setError(error.message)
                setTimeout(()=>{
                    setError(null)
                },4000)
            }
        }
    }

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
            <button
                className='text-orange-500 m-2 underline'
                onClick={() => nav('/Register')}>Create Account</button>
        </div>
    );
}

export default Login;