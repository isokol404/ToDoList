import React from 'react';

const Task = ({ task, loggedIn, handleStatusChange }) => {
    const handleTableAnotherState = (taskId) => {
        // Логика для изменения статуса задачи
    };

    return (
        <React.Fragment key={task.id}>
            <tr className="border-b dark:border-neutral-500">
                <td className="w-16 break-all">{task.id}</td>
                <td className="w-32 break-all">{task.username}</td>
                <td className="w-40 break-all">{task.email}</td>
                <td className="w-48 break-all">{task.task_text}</td>
                <td className="w-32">
                    {loggedIn ? (
                        <input
                            type="checkbox"
                            checked={task.status}
                            onChange={() => handleStatusChange(task.id)}
                        />
                    ) : (
                        <button
                            className="text-blue-500 underline hover:text-blue-700"
                            onClick={() => handleTableAnotherState(task.id)}
                        >
                            {task.status ? 'Completed' : 'Incomplete'}
                        </button>
                    )}
                </td>
            </tr>
        </React.Fragment>
    );
};

export default Task;
