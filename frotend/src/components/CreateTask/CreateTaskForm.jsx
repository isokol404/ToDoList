import React from 'react';

function CreateTaskForm({ username, email, taskText, errors, handleChangeUsername, handleChangeEmail, handleChangeTaskText, handleSubmit, handleCancel }) {
    const hasError = (field) => {
        return errors[field] ? 'border-red-500' : 'border-gray-300';
    };

    const renderErrorMessage = (field) => {
        if (errors[field]) {
            return <p className="text-red-500 text-xs mt-1">{errors[field]}</p>;
        }
        return null;
    };

    const inputClassName = `w-full px-4 py-2 rounded-md border ${hasError('username')} focus:ring-blue-500 focus:border-blue-500`;
    const buttonClassName = 'inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]';
    const cancelButtonClassName = 'ml-2 inline-block rounded bg-gray-300 text-gray-700 px-6 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0';

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block font-semibold mb-1">
                    Username:
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleChangeUsername}
                    className={inputClassName}
                    required
                />
                {renderErrorMessage('username')}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    className={inputClassName}
                    required
                />
                {renderErrorMessage('email')}
            </div>
            <div className="mb-4">
                <label htmlFor="taskText" className="block font-semibold mb-1">
                    Task Text:
                </label>
                <textarea
                    id="taskText"
                    value={taskText}
                    onChange={handleChangeTaskText}
                    className={inputClassName}
                    required
                ></textarea>
                {renderErrorMessage('taskText')}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className={buttonClassName}
                >
                    Create Task
                </button>

                <button
                    type="button"
                    onClick={handleCancel}
                    className={cancelButtonClassName}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CreateTaskForm;
