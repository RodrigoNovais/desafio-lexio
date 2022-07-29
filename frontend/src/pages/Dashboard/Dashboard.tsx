import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Badge, { Status } from '../../components/Badge';
import Input from '../../components/Input';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import DashboardCSS from './Dashboard.module.css';

export type Document = {
    id: number,
    title: string,
    sub_title: string,
    status: keyof typeof Status,
    parties: string[],
    object: string
}

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const [documents, setDocuments] = useState<Document[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        api.get<Document[]>('documents')
                .then(({ data }) => setDocuments(data));
    }, [])

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

                    { documents.map(item => (
                        <div key={item.id} className={DashboardCSS['item']}>
                            <div className={DashboardCSS['title']}>
                                <p>{item.title}</p>
                                <p>{item.sub_title}</p>
                            </div>

                            <div className={DashboardCSS['status']}>
                                <Badge status={item.status} />
                            </div>

                            <div className={DashboardCSS['description']}>
                                <p><span>Objeto: </span>{item.object}</p>
                            </div>

                            <div className={DashboardCSS['members']}>
                                <p>Partes do contrato</p>
                                <div className={DashboardCSS['avatars']}>
                                    {item.parties.map(name => <Avatar key={name} name={name} />)}
                                </div>
                            </div>

                            <div className={DashboardCSS['menu']}>
                                <button>
                                    <img src='/assets/images/icons/three-dots.svg' />
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
            </main>
        </div>
    )
};

export default Dashboard;
