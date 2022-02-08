import React, { ReactChild } from 'react';

interface ButtonProps {
    children: ReactChild,
    outline?: boolean,
    full?: boolean,
    loading?: boolean,
    onClick?: any,
    type?: "submit" | "button",
}

function Button({ children, outline, full, loading, type, onClick }: ButtonProps) {

    const baseClasses: string[] = ['button'];
    const flatClass: string[] = ['flat'];
    const outlineClass: string[] = ['border', 'border-primary', 'text-primary'];

    const classes = (): string[] => {
        let base = [...baseClasses];

        if (outline) {
            base = base.concat(outlineClass);
        } else {
            base = base.concat(flatClass);
        }

        if (full) base.push('w-full');

        return base;
    }

    return (<button
        disabled={loading}
        onClick={onClick}
        type={type || "button"}
        className={classes().join(' ')}
    >
        {loading ? <div className="animate-spin inline-block mr-2"><i className="ri-loader-line"></i></div> : null}
        {children}
    </button>);
}

export default Button;
