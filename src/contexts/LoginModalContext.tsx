'use client';

import React, { createContext, useContext, useState } from 'react';

interface LoginModalContextType {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  openLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export function LoginModalProvider({ children }: { children: React.ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openLoginModal = () => {
    console.log('Opening login modal');
    setShowAuthModal(true);
  };

  return (
    <LoginModalContext.Provider value={{ showAuthModal, setShowAuthModal, openLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
}
