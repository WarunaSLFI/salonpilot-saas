'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'owner') {
        router.push('/dashboard');
      } else if (user.role === 'staff') {
        router.push('/staff');
      }
    }
  }, [user, isLoading, router]);

  // Loading state while checking auth
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );
}
