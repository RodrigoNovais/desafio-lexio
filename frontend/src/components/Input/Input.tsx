import { InputHTMLAttributes } from 'react';

import InputCSS from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    name: string
    children?: React.ReactNode
}

const Input: React.FC<InputProps> = ({ label, name, children, ...rest }) => {
    return (
        <div className={InputCSS['input-block']}>
            <input name={name} id={name} {...rest} />
            <label htmlFor={name}>{label}</label>

            {children}
        </div>
    );
};

export default Input;
