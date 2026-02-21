"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth/useAuth";

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <RequireAuth role="owner">
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Owner Dashboard</h1>
                <p className="mt-2 text-sm text-gray-600">
                    {user?.name} ({user?.email})
                </p>

                <button onClick={logout} className="mt-4 rounded-md border px-4 py-2">
                    Logout
                </button>

                <div className="mt-6">Dashboard Content Goes Here</div>
            </div>
        </RequireAuth>
    );
}
