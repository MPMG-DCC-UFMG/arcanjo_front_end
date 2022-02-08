import React, { useEffect, useRef, useState } from 'react';

interface InputProps {
    name?: string,
    placeholder?: string,
    value?: string,
    defaultValue?: string | number,
    required?: boolean,
    onChange?: (ev: React.FormEvent<HTMLInputElement>) => void | undefined,
    type?: "text" | "password" | "email" | "file"
}

function Input({ name, value, defaultValue, placeholder, type, required, onChange }: InputProps) {
    const [showPlaceholder, setShowPlaceholder] = useState<Boolean>(false);
    const ref = useRef<any>();

    const onChangeLocal = (ev: React.FormEvent<HTMLInputElement>) => {
        setShowPlaceholder(ref.current.value.length > 0);
        if (onChange) onChange(ev);
    }

    useEffect(() => {
        setShowPlaceholder(ref.current.value.length > 0);
    }, [])

    return (<div className='relative'>
        {showPlaceholder ? <label className='inputLabel'>{placeholder}</label> : null}
        <input
            ref={ref}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChangeLocal}
            className={`input ${showPlaceholder ? 'placeholder' : ''}`}
            placeholder={placeholder}
            type={type}
            required={required}
        />
    </div>
    );
}

export default Input;
