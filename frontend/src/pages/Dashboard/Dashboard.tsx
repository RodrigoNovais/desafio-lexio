import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Badge, { Status } from '../../components/Badge';
import Input from '../../components/Input';

import { useAuth } from '../../contexts/auth';

import DashboardCSS from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const [search, setSearch] = useState<string>('');

    const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();

        signOut()
            .then(() => navigate({ pathname: '/login' }));
    };

    return (
        <div className={DashboardCSS['dashboard-container']}>
            <header className={DashboardCSS['navigation']}>
                <img src='/assets/images/lexio-logo.svg' alt='Logo da Lexio' />

                <button type='button' onClick={handleSignOut}>
                    <img src='/assets/images/icons/exit.svg' />
                    Sair
                </button>
            </header>

            <main>
                <header className={DashboardCSS['heading']}>
                    <p>Lexio Teste</p>

                    <div>
                        <img src='/assets/images/icons/calendar.svg' />
                        <p>24</p>
                        <span>Eventos<br /> da semana</span>
                    </div>
                </header>

                <div className={DashboardCSS['list']}>
                    <Input className={DashboardCSS['search']} type='search' name='search' placeholder='Buscar documento' autoComplete='on'
                        value={search} onChange={e => setSearch(e.target.value)}>

                        <button className={DashboardCSS['search-button']} title='Buscar documento'>
                            <img src='/assets/images/icons/magnify.svg' />
                        </button>
                    </Input>

                    <div className={DashboardCSS['item']}>
                        <div className={DashboardCSS['title']}>
                            <p>2021_08_31 Acordo de Confidencialidade</p>
                            <p>Acordo de Confidencialidade</p>
                        </div>

                        <div className={DashboardCSS['status']}>
                            <div className={DashboardCSS['status']}>
                                <Badge status='arquivado' />
                            </div>
                        </div>

                        <div className={DashboardCSS['description']}>
                            <p><span>Objeto: </span>An element that renders when the image hasn't loaded.<br />
                            This means whilst it's loading, or if there was an error.<br />
                            If you notice a flash during loading, you can provide a delay Ms prop to delay its rendering so it only renders for those with slower connections.<br />
                            For more control, use the onLoadingStatusChange handler on Avatar Image.</p>
                        </div>

                        <div className={DashboardCSS['members']}>
                            <p>Partes do contrato</p>
                            <div className={DashboardCSS['avatars']}>
                                {['JS', 'MS', 'GS', 'CL', 'CL'].map(name => (
                                    <Avatar key={name} name={name} />
                                ))}
                            </div>
                        </div>

                        <div className={DashboardCSS['menu']}>
                            <button>
                                <img src='/assets/images/icons/three-dots.svg' />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default Dashboard;
