import React, { ReactChild } from 'react';

interface TitleProps {
    children: ReactChild
}

function Title({ children }: TitleProps) {

    return (<h1
        className='text-5xl font-bold text-primary mt-4'>
        {children}
    </h1>);
}

export default Title;
