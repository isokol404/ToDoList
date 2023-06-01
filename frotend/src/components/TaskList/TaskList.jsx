import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import CreateTask from '../CreateTask/CreateTask.jsx';
import AdminAuthorization from '../AdminAuthorization/AdminAuthorization.jsx';
import Pagination from '../Pagination/Pagination.jsx';

import {
    buttonClass,
    buttonStyles,
    rowClass,
} from '../utils/constants.js';
import TaskRow from "../TaskRow/TaskRow.jsx";

function TaskList() {
    const sortField = useSelector((state) => state.sortField);
    const sortDirection = useSelector((state) => state.sortDirection);
    const statusFilter = useSelector((state) => state.statusFilter);

    const [tasks, setTasks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(3);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showAdminAuthorization, setShowAdminAuthorization] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');
    const [, setShowEditModal] = useState(false);

    const editFieldRef = useRef(null);
    const editTaskInputRef = useRef(null);

    useEffect(() => {
        fetchData();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [offset, limit, sortField, sortDirection, statusFilter]);

    const fetchData = async () => {
        try {
            let url = `http://127.0.0.1:5000/api/tasks?offset=${offset}&limit=${limit}&sort_field=${sortField}&sort_direction=${sortDirection}`;
            if (statusFilter === 'completed') {
                url += '&status=completed';
            } else if (statusFilter === 'incomplete') {
                url += '&status=incomplete';
            }

            const response = await fetch(url);
            const data = await response.json();
            setTasks(data);
            setHasNextPage(data.length === limit);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (editTaskInputRef.current && !editTaskInputRef.current.contains(event.target)) {
            handleUpdateTaskText();
        }
    };

    const saveTaskText = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/update_task_text/${editTaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task_text: editTaskText }),
            });

            if (response.ok) {
                setShowEditModal(false);
                fetchData(); // Обновление данных после изменения текста задачи
            } else {
                console.error('Error updating task text:', response.status);
            }
        } catch (error) {
            console.error('Error updating task text:', error);
        }
    };

    const handleOutsideClick = (e) => {
        if (editFieldRef.current && !editFieldRef.current.contains(e.target)) {
            saveTaskText();
            setShowEditModal(false);
        }
    };

    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset(offset - limit);
        }
    };

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const handleToggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handleToggleAdminAuthorization = () => {
        setShowAdminAuthorization(!showAdminAuthorization);
    };

    const closeModal = () => {
        setShowCreateForm(false);
    };

    const handleStatusChange = async (taskId) => {
        if (!loggedIn) {
            return; // Блокировать изменение, если пользователь не вошел в систему
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/table_another_state/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('Error changing task status:', response.status);
            }
        } catch (error) {
            console.error('Error changing task status:', error);
        }
    };

    const handleEditTask = (taskId, taskText) => {
        setEditTaskId(taskId);
        setEditTaskText(taskText);
    };

    const handleUpdateTaskText = async (e) => {
        const updateTaskText = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/update_task_text/${editTaskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ task_text: editTaskText }),
                });

                if (response.ok) {
                    setShowEditModal(false);
                    await fetchData(); // Обновление данных после изменения текста задачи
                } else {
                    console.error('Error updating task text:', response.status);
                }
            } catch (error) {
                console.error('Error updating task text:', error);
            }
        };

        if (e.key === 'Enter') {
            await updateTaskText();
        } else if (e.type === 'click') {
            const isInsideInput = e.target.closest('.task-text-input');
            if (!isInsideInput) {
                e.stopPropagation(); // Останавливаем всплытие события click, чтобы избежать закрытия модального окна
                await updateTaskText();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleUpdateTaskText);
        return () => {
            document.removeEventListener('mousedown', handleUpdateTaskText);
        };
    }, []);



    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Task List</h1>
            <button
                className={`${buttonClass} bg-blue-500 ${buttonStyles}`}
                onClick={handleToggleCreateForm}
            >
                Create New Task
            </button>

            {loggedIn ? (
                <button
                    className={`${buttonClass} bg-green-500 ${buttonStyles}`}
                    onClick={() => setLoggedIn(false)}
                >
                    Logout
                </button>
            ) : (
                <button
                    className={`${buttonClass} bg-blue-500 ${buttonStyles}`}
                    onClick={handleToggleAdminAuthorization}
                >
                    Login
                </button>
            )}

            {showCreateForm && <CreateTask closeModal={closeModal} />}
            {showAdminAuthorization && (
                <AdminAuthorization
                    onAdminAuthorize={() => {
                        setShowAdminAuthorization(false);
                        setLoggedIn(true);
                    }}
                    onCloseModal={handleToggleAdminAuthorization}
                />
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse table-fixed w-[90%]">
                    <colgroup>
                        <col className="w-16" />
                        <col className="w-32" />
                        <col className="w-40" />
                        <col className="w-48" />
                        <col className="w-32" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th className={rowClass}>ID</th>
                        <th className={rowClass}>Username</th>
                        <th className={rowClass}>Email</th>
                        <th className={rowClass}>Task Text</th>
                        <th className={rowClass}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <TaskRow
                            key={task.id}
                            task={task}
                            handleStatusChange={handleStatusChange}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                offset={offset}
                setOffset={setOffset}
                limit={limit}
                hasNextPage={hasNextPage}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
}

export default TaskList;
