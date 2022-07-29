import Routes from './routes';

import { AuthProvider } from './contexts/auth';

import './styles/reset.css';
import './styles/styles.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
};

export default App;
