// reducers.js

const initialState = {
    sortField: 'id',
    sortDirection: 'asc',
    statusFilter: '', // Изначально пустой фильтр статуса
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SORT_FIELD':
            return {
                ...state,
                sortField: action.payload,
            };
        case 'SET_SORT_DIRECTION':
            return {
                ...state,
                sortDirection: action.payload,
            };
        case 'SET_STATUS_FILTER':
            return {
                ...state,
                statusFilter: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
