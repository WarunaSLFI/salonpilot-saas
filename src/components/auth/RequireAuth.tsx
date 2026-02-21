'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import { Role } from '@/lib/auth/types';

export default function RequireAuth({
    children,
    role,
}: {
    children: React.ReactNode;
    role?: Role;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                // Not logged in
                router.push('/login');
            } else if (role && user.role !== role) {
                // Logged in but wrong role, redirect to correct dashboard
                if (user.role === 'owner') {
                    router.push('/dashboard');
                } else if (user.role === 'staff') {
                    router.push('/staff');
                } else {
                    router.push('/login');
                }
            }
        }
    }, [user, isLoading, role, router]);

    // Show a blank/loading screen while checking auth
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    // If not logged in, or role mismatches, render nothing until redirect happens
    if (!user || (role && user.role !== role)) {
        return null;
    }

    // Authorized
    return <>{children}</>;
}
