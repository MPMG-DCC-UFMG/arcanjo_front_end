import React from 'react';

interface PaginationProps {
    pageCount: number,
    currentPage: number,
    onChangePage: (page: number) => void,
}

function Pagination({ pageCount, currentPage, onChangePage }: PaginationProps) {
    return (
        pageCount > 1 ?
            <ul className='text-center'>
                {Array.from(Array(pageCount).keys()).map(i =>
                    <li onClick={() => onChangePage(i + 1)} className={`px-4 py-2 inline-block cursor-pointer border mx-1 ${i + 1 === currentPage ? 'bg-primary text-white' : 'hover:bg-slate-200'} `}>{i + 1}</li>
                )}
            </ul>
            : null
    );
}

export default Pagination;
