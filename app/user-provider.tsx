'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserContextProps {
  isAuthenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextProps>(null as unknown as UserContextProps);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setAuthenticated(true);
      router.push('/dashboard');
    } 
  }, [router]);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setAuthenticated(true);
    router.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setAuthenticated(false);
    router.push('/');
  };
  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
