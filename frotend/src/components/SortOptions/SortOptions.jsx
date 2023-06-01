import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortField, setSortDirection, setStatusFilter } from '../../actions.js';

function SortOptions() {
    const sortField = useSelector((state) => state.sortField);
    const sortDirection = useSelector((state) => state.sortDirection);
    const statusFilter = useSelector((state) => state.statusFilter);
    const dispatch = useDispatch();

    const [selectedStatusFilter, setSelectedStatusFilter] = useState(statusFilter);

    const handleSortFieldChange = (event) => {
        const newSortField = event.target.value;
        dispatch(setSortField(newSortField));
    };

    const handleSortDirectionChange = (event) => {
        const newSortDirection = event.target.value;
        dispatch(setSortDirection(newSortDirection));
    };

    const handleStatusFilterChange = (event) => {
        const newStatusFilter = event.target.value;
        setSelectedStatusFilter(newStatusFilter);
        dispatch(setStatusFilter(newStatusFilter));
    };

    return (
        <div className="py-4">
            <div className="flex items-center justify-center mb-4">
                <label className="mr-4">
                    Sort By:
                    <select
                        value={sortField}
                        onChange={handleSortFieldChange}
                        className="ml-2 p-2 border border-gray-300 rounded-md"
                    >
                        <option value="id">ID</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                        <option value="task_text">Task Text</option>
                    </select>
                </label>
                <label className="mr-4">
                    Sort Direction:
                    <select
                        value={sortDirection}
                        onChange={handleSortDirectionChange}
                        className="ml-2 p-2 border border-gray-300 rounded-md"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <div>
                <label className="mr-4">
                    Show:
                    <input
                        type="radio"
                        name="statusFilter"
                        value="all"
                        checked={selectedStatusFilter === 'all'}
                        onChange={handleStatusFilterChange}
                        className="ml-2 mr-1"
                    />
                    <span className="mr-4">All</span>
                </label>
                <label className="mr-4">
                    <input
                        type="radio"
                        name="statusFilter"
                        value="completed"
                        checked={selectedStatusFilter === 'completed'}
                        onChange={handleStatusFilterChange}
                        className="ml-2 mr-1"
                    />
                    <span className="mr-4">Completed</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="statusFilter"
                        value="incomplete"
                        checked={selectedStatusFilter === 'incomplete'}
                        onChange={handleStatusFilterChange}
                        className="ml-2 mr-1"
                    />
                    <span>Incomplete</span>
                </label>
            </div>
        </div>
    );
}

export default SortOptions;
