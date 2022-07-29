import { useEffect, useState } from 'react';

import Document, { Agreement } from '../../components/Document';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Navigation from '../../components/Navigation';

import api from '../../services/api';

import DashboardCSS from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const [documents, setDocuments] = useState<Agreement[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        api.get<Agreement[]>('documents')
                .then(({ data }) => setDocuments(data));
    }, [])

    return (
        <div className={DashboardCSS['dashboard-container']}>
            <Navigation />

            <main>
                <Heading />

                <div className={DashboardCSS['list']}>
                    <Input className={DashboardCSS['search']} type='search' name='search' placeholder='Buscar documento' autoComplete='on'
                        value={search} onChange={e => setSearch(e.target.value)}>

                        <button className={DashboardCSS['search-button']} title='Buscar documento'>
                            <img src='/assets/images/icons/magnify.svg' />
                        </button>
                    </Input>

                    { documents.map(item => <Document key={item.id} document={item} />) }
                </div>
            </main>
        </div>
    )
};

export default Dashboard;
