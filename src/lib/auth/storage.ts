import { User } from './types';

const AUTH_KEY = 'salonpilot_auth_user';

export const getAuth = (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to parse auth data', error);
        return null;
    }
};

export const setAuth = (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const clearAuth = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_KEY);
};
