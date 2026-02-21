'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types';
import { getAuth, setAuth, clearAuth } from './storage';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hydrate auth status from localStorage on mount
        const storedUser = getAuth();
        if (storedUser) {
            // eslint-disable-next-line
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = (newUser: User) => {
        setAuth(newUser);
        setUser(newUser);
    };

    const logout = () => {
        clearAuth();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
