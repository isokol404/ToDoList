import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleStatusChange, setEditTaskId, setEditTaskText, setShowEditModal } from './actions';

function TaskRow({ task }) {
    const dispatch = useDispatch();
    const editTaskId = useSelector(state => state.editTaskId);
    const editTaskText = useSelector(state => state.editTaskText);
    const showEditModal = useSelector(state => state.showEditModal);

    const editFieldRef = useRef(null);

    const handleUpdateTaskText = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            dispatch(setEditTaskId(null));
            dispatch(setShowEditModal(false));
            // Update task text in the backend
            // ...
        } else if (e.key === 'Escape') {
            dispatch(setEditTaskId(null));
            dispatch(setShowEditModal(false));
        } else {
            dispatch(setEditTaskText(e.target.value));
        }
    };

    return (
        <tr key={task.id} className="border-b dark:border-neutral-500">
            <td className="py-4 px-6 text-center">{task.id}</td>
            <td className="py-4 px-6 text-center">{task.username}</td>
            <td className="py-4 px-6 text-center">{task.email}</td>
            <td className="py-4 px-6 text-center relative">
                {editTaskId === task.id && showEditModal ? (
                    <input
                        ref={editFieldRef}
                        type="text"
                        value={editTaskText}
                        onChange={handleUpdateTaskText}
                        onBlur={handleUpdateTaskText}
                        onKeyDown={handleUpdateTaskText}
                        className="w-full rounded-lg p-2 bg-yellow-200 shadow"
                    />
                ) : (
                    <div
                        ref={editFieldRef}
                        className="break-all cursor-pointer"
                        onClick={() => {
                            dispatch(setEditTaskId(task.id));
                            dispatch(setEditTaskText(task.task_text));
                            dispatch(setShowEditModal(true));
                        }}
                    >
                        {task.task_text}
                    </div>
                )}
            </td>
            <td className="py-4 px-6 text-center">
                <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => dispatch(handleStatusChange(task.id))}
                />
            </td>
        </tr>
    );
}

export default TaskRow;
