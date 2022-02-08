import React, { ReactChild } from 'react';

interface AlertProps {
    children: ReactChild
}


function Alert({ children }: AlertProps) {
    return (
        <div className="my-4 card alert text-xs">
            {children}
        </div>
    );
}

export default Alert;
