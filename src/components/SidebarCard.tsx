import React, { ReactChild } from 'react';
import Card from './Card';
import Button from './Button';
import { Link } from 'react-router-dom';

export interface SidebarButton {
    label: string;
    linkTo: string;
    icon?: string;
    outline?: boolean;
}

interface ButtonProps {
    isClosed?: boolean;
    buttons?: SidebarButton[]
}

function SidebarCard({ buttons, isClosed = false }: ButtonProps) {

    return (
        <Card>
            <div className="text-center">
                <Link to="/">
                    <img src="/images/logo.svg" alt="Arcanjo" width="180" className={`${isClosed ? 'mt-6' : ''} inline-block`} />
                </Link>
                <div className="mt-8">
                    {buttons?.map(button => <div key={button.label} className='my-4'>
                        <Link to={button.linkTo} title={button.label}>
                            <Button full outline={button.outline}><>
                                {button.icon ? <i className={`ri-${button.icon} mx-2 align-text-top`}></i> : null}
                                {!isClosed ? button.label : null}
                            </></Button>
                        </Link>
                    </div>)}
                </div>
            </div>
        </Card>
    );
}

export default SidebarCard;
