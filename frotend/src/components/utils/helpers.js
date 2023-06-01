export const handlePreviousPage = (offset, setOffset, limit) => {
    if (offset > 0) {
        setOffset(offset - limit);
    }
};

export const handleNextPage = (offset, setOffset, limit) => {
    setOffset(offset + limit);
};

export const handleToggleCreateForm = (showCreateForm, setShowCreateForm) => {
    setShowCreateForm(!showCreateForm);
};

export const handleToggleAdminAuthorization = (
    showAdminAuthorization,
    setShowAdminAuthorization
) => {
    setShowAdminAuthorization(!showAdminAuthorization);
};

export const closeModal = (setShowCreateForm) => {
    setShowCreateForm(false);
};

export const handleStatusChange = async (taskId, fetchData) => {
    try {
        const response = await fetch(
            ` https://835c-62-84-101-64.ngrok-free.app/
/api/table_another_state/${taskId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            fetchData();
        } else {
            console.error('Error changing task status:', response.status);
        }
    } catch (error) {
        console.error('Error changing task status:', error);
    }
};

export async function fetchTasks(offset, limit, sortField, sortDirection, statusFilter) {
    try {
        let url = `http://127.0.0.1:5000/
/api/tasks?offset=${offset}&limit=${limit}&sort_field=${sortField}&sort_direction=${sortDirection}`;
        if (statusFilter === 'completed') {
            url += '&status=completed';
        } else if (statusFilter === 'incomplete') {
            url += '&status=incomplete';
        }

        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function changeTaskStatus(taskId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/
/api/table_another_state/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Error changing task status:', response.status);
            throw new Error(`Error changing task status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error changing task status:', error);
        throw error;
    }
}

export default {
    handlePreviousPage,
    handleNextPage,
    handleToggleCreateForm,
    handleToggleAdminAuthorization,
    closeModal,
    handleStatusChange,
    fetchTasks,
    changeTaskStatus,
};
