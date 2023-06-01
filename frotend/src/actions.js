export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';

// actions.js

// Действие для установки поля сортировки
export const setSortField = (sortField) => {
    return {
        type: 'SET_SORT_FIELD',
        payload: sortField,
    };
};

// Действие для установки направления сортировки
export const setSortDirection = (sortDirection) => {
    return {
        type: 'SET_SORT_DIRECTION',
        payload: sortDirection,
    };
};

// создать новую задачу

// actions.js

export const createTask = (taskData) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://example.com/api/create_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'CREATE_TASK_SUCCESS', payload: data });
            } else {
                throw new Error('Не удалось создать задачу');
            }
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
            dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
        }
    };
};



// Действие для установки фильтра по статусу
export const setStatusFilter = (statusFilter) => {
    return {
        type: 'SET_STATUS_FILTER',
        payload: statusFilter,
    };
};
