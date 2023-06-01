import React from 'react';
import PaginationButton from './PaginationButton';

function Pagination({ offset, setOffset, limit, hasNextPage }) {
    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset(offset - limit);
        }
    };

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    return (
        <div className="flex justify-between mt-4">
            {offset > 0 && (
                <PaginationButton onClick={handlePreviousPage} isPrevious>
                    Previous
                </PaginationButton>
            )}
            <div></div>
            {hasNextPage && (
                <div className="flex justify-end">
                    <PaginationButton onClick={handleNextPage} disabled={!hasNextPage}>
                        Next
                    </PaginationButton>
                </div>
            )}
        </div>
    );
}

export default Pagination;
