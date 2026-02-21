'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAuth } from '@/lib/auth/useAuth';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <RequireAuth role="owner">
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Owner Dashboard
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">
                                {user?.name} ({user?.email})
                            </span>
                            <button
                                onClick={logout}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="rounded-xl border-4 border-dashed border-gray-200 p-8 text-center text-gray-400">
                                Dashboard Content Goes Here
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RequireAuth>
    );
}
