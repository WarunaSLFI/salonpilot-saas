"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import type { User } from "./types";
import { clearAuth, getAuth, setAuth } from "./storage";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = getAuth();
        if (storedUser) setUserState(storedUser);
        setIsLoading(false);
    }, []);

    const login = (newUser: User) => {
        setAuth(newUser);
        setUserState(newUser);
    };

    const logout = () => {
        clearAuth();
        setUserState(null);
    };

    const value = useMemo(
        () => ({ user, isLoading, login, logout }),
        [user, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
