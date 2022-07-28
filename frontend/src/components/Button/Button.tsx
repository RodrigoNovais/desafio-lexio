import { ButtonHTMLAttributes } from 'react';

import ButtonCSS from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <button className={ButtonCSS['button']} {...rest}>{children}</button>
);

export default Button;
