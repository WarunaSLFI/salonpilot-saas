'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fakeUsers } from '@/lib/auth/fakeUsers';
import { useAuth } from '@/lib/auth/useAuth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple mockup validation
        if (password !== '123456') {
            setError('Invalid credentials');
            return;
        }

        const user = fakeUsers.find((u) => u.email === email);
        if (!user) {
            setError('Invalid credentials');
            return;
        }

        login(user);

        // Redirect based on role
        if (user.role === 'owner') {
            router.push('/dashboard');
        } else {
            router.push('/staff');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">SalonPilot</h1>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="owner@salon.lk or staff1@salon.lk"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="123456"
                        />
                    </div>

                    {error && <div className="text-sm text-red-600">{error}</div>}

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign in
                    </button>
                </form>

                <div className="mt-6 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
                    <p>Demo credentials:</p>
                    <p>owner@salon.lk / 123456</p>
                    <p>staff1@salon.lk / 123456</p>
                </div>
            </div>
        </div>
    );
}
