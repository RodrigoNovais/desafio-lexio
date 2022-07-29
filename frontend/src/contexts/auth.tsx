import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';

import { AUTH_TOKEN, AUTH_USER } from '../constants';

type WithToken<T> = T & { token: string; }

export type User = { name: string; };
export type AuthResponse = WithToken<User>;

export type SignInCredentials = {
    email: string;
    password: string;
};

export type AuthContextData = {
    signed: boolean;
    loading: boolean;

    user?: User;

    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
};

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>();

    const clearCredentials = () => { localStorage.clear(); };

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN);
        const user = localStorage.getItem(AUTH_USER);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(JSON.parse(user!));
        setLoading(false);
    }, []);

    const storeAuthData = async (token: string, user: User) => {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem(AUTH_USER, JSON.stringify(user));

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setLoading(false);
        setUser(user);
    };

    const signIn = async (credentials: SignInCredentials): Promise<void> => {
        return new Promise((resolve, reject) => {
            setLoading(true);

            api.post<AuthResponse>('login', credentials)
                .then(({ data }) => {
                    storeAuthData(data.token, { name: data.name });
                    resolve();
                })
                .catch(error => {
                    setLoading(false);
                    reject(error);
                });
        });
    };

    const signOut = async () => {
        clearCredentials();

        delete api.defaults.headers.common['Authorization'];
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
