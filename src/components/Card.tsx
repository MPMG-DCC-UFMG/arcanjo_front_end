import React, { ReactChild } from 'react';

interface CardProps {
    children: ReactChild
}

function Card({ children }: CardProps) {

    return (<div
        className="card">
        {children}
    </div>);
}

export default Card;
