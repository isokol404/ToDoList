import React from 'react';
import CreateTaskForm from './CreateTaskForm';

function CreateTaskModal({ username, email, taskText, errors, handleChangeUsername, handleChangeEmail, handleChangeTaskText, handleSubmit, handleCancel }) {
    return (
        <div className="fixed left-0 top-0 z-[1055] bg-gray-900 bg-opacity-50 flex items-center justify-center h-full w-full">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
                <CreateTaskForm
                    username={username}
                    email={email}
                    taskText={taskText}
                    errors={errors}
                    handleChangeUsername={handleChangeUsername}
                    handleChangeEmail={handleChangeEmail}
                    handleChangeTaskText={handleChangeTaskText}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default CreateTaskModal;
