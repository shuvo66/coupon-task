'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserContext } from '../user-provider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return children;
}
