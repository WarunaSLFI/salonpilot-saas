"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import type { Role } from "@/lib/auth/types";

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
        if (isLoading) return;

        if (!user) {
            router.push("/login");
            return;
        }

        if (role && user.role !== role) {
            router.push(user.role === "owner" ? "/dashboard" : "/staff");
        }
    }, [user, isLoading, role, router]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;
    if (role && user.role !== role) return null;

    return <>{children}</>;
}
