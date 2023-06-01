import React, { useState } from 'react';

const AdminAuthorizationForm = ({ onAdminAuthorize, onCloseModal }) => {
    const [credentials, setCredentials] = useState({ login: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { login, password } = credentials;

        // Simulate authorization check
        if (login === 'admin' && password === '123') {
            onAdminAuthorize();
        } else {
            setErrorMessage('Invalid login or password');
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="login" className="block mb-2">
                Login:
            </label>
            <input
                type="text"
                id="login"
                name="login"
                value={credentials.login}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded"
            />
            <label htmlFor="password" className="block mb-2 mt-4">
                Password:
            </label>
            <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 py-1 rounded"
            />
            {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={onCloseModal}
                    className="mr-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm text-sm"
                >
                    Authorize
                </button>
            </div>
        </form>
    );
};

export default AdminAuthorizationForm;
