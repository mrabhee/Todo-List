import React, { useCallback, useEffect, useState } from 'react'
import { database } from '../Appwrite/config'
import { collectionId, databaseId } from '../Appwrite/appwriteid'
import { Query } from 'appwrite'

const TodoList = ({ emailid }) => {
    const [newTodo, setNewTodo] = useState('')
    const [viewtodo, setViewtodo] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTodo !== '') {
            createDb()
        }
        else {
            alert("Fill Data")
        }
    }

    const createDb = async () => {
        try {
            await database.createDocument(databaseId, collectionId, 'unique()', {
                todo: newTodo,
                email: emailid
            }).then(() => {
                handleView()
            }).then(() => {
                setNewTodo('')
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleView = useCallback(async () => {
        try {
            const dbtodo = await database.listDocuments(databaseId, collectionId, [Query.equal('email', emailid)])
            setViewtodo(dbtodo.documents)
            
        } catch (error) {
            console.log(error)
        }
    },[databaseId, collectionId, emailid, database, setViewtodo, Query])

    const handleDelete = async (id) => {
        try {
            await database.deleteDocument(databaseId, collectionId, id)
            handleView()
        } catch (error) {
            console.log(error)
        }
    } 


    useEffect(() => {
        handleView()
    }, [databaseId, collectionId, emailid, database, setViewtodo, Query])

    return (
        <>
            <div className="flex flex-col w-1/2 mx-auto p-4 bg-white rounded shadow-md mt-10">
                <h1 className="text-3xl font-bold mb-4">Todo List</h1>

                <form onSubmit={handleSubmit} className='flex items-center justify-center'>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new todo"
                        className="w-full p-2 mb-4 border border-gray-400 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold mx-4 mb-4 py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </form>
                {
                    <ul>
                        {viewtodo.map((todo, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-2 border-b border-gray-200"
                            >
                                <span>
                                    {todo.todo}
                                </span>
                                <div>
                                    <button
                                        onClick={() => handleDelete(todo.$id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                }

            </div>
        </>
    )
}

export default TodoList