import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import NavigationCSS from './Navigation.module.css';

const Navigation: React.FC = () => {
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        signOut()
            .then(() => navigate({ pathname: '/login' }));
    };

    return (
        <header className={NavigationCSS['navigation']}>
            <img src='/assets/images/lexio-logo.svg' alt='Logo da Lexio' />

            <button type='button' onClick={handleSignOut}>
                <img src='/assets/images/icons/exit.svg' />
                Sair
            </button>
        </header>
    );
};

export default Navigation;
