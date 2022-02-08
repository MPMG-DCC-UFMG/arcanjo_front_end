import React, { ReactChild } from 'react';
import Card from './Card';
import Button from './Button';
import { Link } from 'react-router-dom';

export interface SidebarButton {
    label: string;
    linkTo: string;
    outline?: boolean;
}

interface ButtonProps {
    buttons?: SidebarButton[]
}

function SidebarCard({ buttons }: ButtonProps) {

    return (
        <Card>
            <div className="text-center">
                <Link to="/">
                    <img src="/images/logo.svg" alt="Arcanjo" width="180" className='inline-block' />
                </Link>
                <div className="mt-8">
                    {buttons?.map(button => <div key={button.label} className='my-4'>
                        <Link to={button.linkTo}>
                            <Button full outline={button.outline}>{button.label}</Button>
                        </Link>
                    </div>)}
                </div>
            </div>
        </Card>
    );
}

export default SidebarCard;
