"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../Redux/hooks';
import { RootState } from '../Redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { token, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && !storedToken) {
      router.push('/login');
    }
  }, [token, router]);

  if (typeof window === 'undefined') return null;

  if (!token && !localStorage.getItem('token')) {
    return null;
  }

  return <>{children}</>;
} 