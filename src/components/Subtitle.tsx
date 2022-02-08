import React, { ReactChild } from 'react';

interface SubtitleProps {
    children: ReactChild
}

function Subtitle({ children }: SubtitleProps) {

    return (<h2
        className='text-2xl font-bold text-gray-600 mt-4'>
        {children}
    </h2>);
}

export default Subtitle;
