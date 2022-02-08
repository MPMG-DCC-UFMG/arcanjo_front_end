import React, { ReactChild } from 'react';

interface LabelProps {
    children: ReactChild
}

function Label({ children }: LabelProps) {

    return (<label
        className='text-base font-bold text-gray-600 mt-6 mb-2 block'>
        {children}
    </label>);
}

export default Label;
