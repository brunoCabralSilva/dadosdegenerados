'use client'
import { ReactNode, useState } from 'react';
import contexto from './context';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  const [dataUser, setDataUser] = useState({ email: '', displayName: '' });
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  const [logoutUser, setLogoutUser] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <contexto.Provider
      value={{
        dataUser, setDataUser,
        showMessage, setShowMessage,
        logoutUser, setLogoutUser,
        showForgotPassword, setShowForgotPassword,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

