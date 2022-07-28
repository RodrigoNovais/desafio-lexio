import { useEffect, useState } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import LoginCSS from './Login.module.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [togglePassword, setTogglePassword] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => setDisabled(!email || !password), [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={LoginCSS['login-container']}>
            <img className={LoginCSS['banner']} src="/assets/images/banner.png" />

            <form className={LoginCSS['container']} onSubmit={handleSubmit}>
                <fieldset>
                    <legend className={LoginCSS['title']}>Bem vindo(a)!</legend>

                    <p className={LoginCSS['subtitle']}>
                        Crie, assine e gerencie contratos como nunca antes!<br />
                        <span className={LoginCSS['emphasis']}>Comece agora!</span>
                    </p>

                    <div className={LoginCSS['fields']}>
                        <Input type='email' name='email' label='email' placeholder='Email' autoComplete='email'
                            maxLength={255} value={email} onChange={e => setEmail(e.target.value)}/>

                        <Input type={togglePassword ? 'password' : 'text'} name='password' label='Password'
                            placeholder='Senha' autoComplete='current-password'
                            maxLength={255} value={password} onChange={e => setPassword(e.target.value)}>

                            <button className={LoginCSS['toggle']} title='Mostrar Senha' onClick={() => setTogglePassword(toggle => !toggle)}>
                                <img src={`/assets/images/icons/${togglePassword ? 'eye' : 'eye-closed'}.svg`}
                                    alt={togglePassword ? 'Mostrar senha' : 'Ocultar senha'} />
                            </button>
                        </Input>

                        <Button disabled={disabled} type="submit">Login</Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;
