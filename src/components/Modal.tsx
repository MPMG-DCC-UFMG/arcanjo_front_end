import React, { ReactChild } from 'react';
import Card from './Card';

interface ModalProps {
    children: ReactChild
}

function Modal({ children }: ModalProps) {

    return (<div
        className="fixed left-0 right-0 top-0 bottom-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
        <div className='w-full max-w-lg'>
            <Card>
                {children}
            </Card>
        </div>
    </div>);
}

export default Modal;
