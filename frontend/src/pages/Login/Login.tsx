import { useEffect, useState } from 'react';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        signIn({ email, password })
            .then(() => navigate({ pathname: '/' }));
    };

    const togglePasswordVisibility = () => setTogglePassword(toggle => !toggle);

    return (
        <div className={LoginCSS['login-container']}>
            <img className={LoginCSS['banner']} src='/assets/images/banner.png' />

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
                            placeholder='Senha' autoComplete='current-password'
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
