import React from 'react';

import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/auth';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

export type PrivateRouteProps = {
    children?: React.ReactElement;
    redirect: string;
}

export const RequireAuth: React.FC<PrivateRouteProps> = ({ children, redirect }) => {
    const { signed } = useAuth();

    return signed
        ? children ?? null
        : <Navigate to={redirect} />;
};

const Routes: React.FC = () => {
    const { signed } = useAuth();

    return (
        <BrowserRouter>
            <Switch>
                <Route index element={
                    <RequireAuth redirect="/login">
                        <Dashboard />
                    </RequireAuth>
                } />

                { !signed && <Route path="login" element={<Login />} /> }

                <Route path="*" element={<Navigate to="/" replace />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
