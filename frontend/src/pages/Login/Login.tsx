import { KeyboardEventHandler, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../contexts/auth';

import LoginCSS from './Login.module.css';

const Login: React.FC = () => {
    const { signIn, loading } = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [togglePassword, setTogglePassword] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => setDisabled(!email || !password), [email, password]);

    const loginAttempt = () => {
        if (loading) return;

        signIn({ email, password })
            .then(() => navigate({ pathname: '/' }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginAttempt();
    };

    const handlePressEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        loginAttempt();
    }

    const togglePasswordVisibility = () => setTogglePassword(toggle => !toggle);

    return (
        <div className={LoginCSS['login-container']}>
            <section className={LoginCSS['banner']}>
                <h1>
                    lex<span>io</span>
                </h1>

                <p>Criação e gestão de contratos de forma eficiente e descomplicada!</p>
            </section>

            <form className={LoginCSS['container']} onSubmit={handleSubmit}>
                <fieldset>
                    <legend className={LoginCSS['title']}>Bem vindo(a)!</legend>

                    <p className={LoginCSS['subtitle']}>
                        Crie, assine e gerencie contratos como nunca antes!<br />
                        <span className={LoginCSS['emphasis']}>Comece agora!</span>
                    </p>

                    <div className={LoginCSS['fields']}>
                        <Input type='email' name='email' label='Email' placeholder='Email' autoComplete='email'
                            maxLength={255} value={email} onChange={e => setEmail(e.target.value)}/>

                        <Input type={togglePassword ? 'password' : 'text'} name='password' label='Senha'
                            placeholder='Senha' autoComplete='current-password' onKeyDown={handlePressEnter}
                            maxLength={255} value={password} onChange={e => setPassword(e.target.value)}>

                            <button className={LoginCSS['toggle']} title='Mostrar Senha' onClick={togglePasswordVisibility}>
                                <img src={`/assets/images/icons/${togglePassword ? 'eye' : 'eye-closed'}.svg`}
                                    alt={togglePassword ? 'Mostrar senha' : 'Ocultar senha'} />
                            </button>
                        </Input>

                        <Button disabled={disabled} type='submit'>Login</Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;
