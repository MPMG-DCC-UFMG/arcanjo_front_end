import React from 'react';

function EmptyState({ text }: { text: string }) {
    return (
        <div className="text-center text-gray-500 my-12">
            <div className='text-6xl text-primary'>
                <i className="ri-file-warning-line"></i>
            </div>
            {text}
        </div>
    );
}

export default EmptyState;
