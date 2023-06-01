import React from 'react';
import AdminAuthorizationForm from './AdminAuthorizationForm';

const AdminAuthorization = ({ onAdminAuthorize, onCloseModal }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Admin Authorization</h2>
            <AdminAuthorizationForm onAdminAuthorize={onAdminAuthorize} onCloseModal={onCloseModal} />
        </div>
    </div>
);

export default AdminAuthorization;
