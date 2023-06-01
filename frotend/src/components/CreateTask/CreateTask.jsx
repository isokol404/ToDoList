import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../actions.js';
import CreateTaskModal from './CreateTaskModal.jsx';

function CreateTask() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [taskText, setTaskText] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        taskText: false,
    });
    const [taskCreated, setTaskCreated] = useState(false); // Статус создания задачи

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        switch (field) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'taskText':
                setTaskText(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка заполнения полей
        const fieldErrors = {};
        if (!username) {
            fieldErrors.username = true;
        }
        if (!email) {
            fieldErrors.email = true;
        }
        if (!taskText) {
            fieldErrors.taskText = true;
        }
        setErrors(fieldErrors);

        // Если есть пустые поля, возврат
        if (Object.keys(fieldErrors).length > 0) {
            return;
        }

        // Создание объекта задачи с введенными значениями
        const newTask = {
            username,
            email,
            task_text: taskText,
        };

        // Отправка экшена для создания задачи
        dispatch(createTask(newTask));

        // Сброс полей формы и ошибок
        setUsername('');
        setEmail('');
        setTaskText('');
        setErrors({
            username: false,
            email: false,
            taskText: false,
        });

        // Закрытие модального окна и отображение сообщения
        setModalVisible(false);
        setTaskCreated(true);
        setTimeout(() => {
            setTaskCreated(false);
        }, 3000); // Закрыть модальное окно через 3 секунды
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible && (
                <CreateTaskModal
                    username={username}
                    email={email}
                    taskText={taskText}
                    errors={errors}
                    handleChangeUsername={(e) => handleInputChange(e, 'username')}
                    handleChangeEmail={(e) => handleInputChange(e, 'email')}
                    handleChangeTaskText={(e) => handleInputChange(e, 'taskText')}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            )}
            {taskCreated && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="success-message">
                            <p>Задача успешно создана!</p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default CreateTask;
