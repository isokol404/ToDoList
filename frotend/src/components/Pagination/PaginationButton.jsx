import React from 'react';
import { buttonNavigationStyles } from '../utils/constants.js';

function PaginationButton({ onClick, disabled, children, isPrevious }) {
    const buttonClassName = `${buttonNavigationStyles} ${isPrevious ? 'mr-2' : 'ml-2'}`;

    return (
        <button className={buttonClassName} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default PaginationButton;
