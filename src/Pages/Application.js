import React, { useState, useEffect } from 'react';
import { account } from '../Appwrite/config';
import { useNavigate } from 'react-router-dom';
import TodoList from './TodoList'

function Application() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const nav = useNavigate()


    const logout = async (e) => {
        e.preventDefault()
        try {
            nav('/')
            // await account.deleteSession('current')

        } catch (error) {
            console.log(error)
            // nav('/')
        }
    };

    useEffect(() => {
        const getAcc = async () => {
            try {
                const acc = await account.get()
                if (acc.status) {
                    setName(acc.name)
                    setEmail(acc.email)
                }
            } catch (error) {

            }

        }
        getAcc()
    },[])

    return (
        <>
            <div className=" flex justify-between items-center max-w-full h-[10vh] mx-auto p-4 pt-4 md:p-4 lg:p-10 bg-white rounded shadow-md">
                <h1 className="text-xl font-bold ">Hello! {name}</h1>
                <p className="text-gray-600">{email}</p>
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 m-4 rounded"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <TodoList emailid={email}/>
        </>
    );
}

export default Application;