'use client'
import { createContext } from 'react';

interface DegeneratesContext {
  dataUser: { email: string, displayName: string },
  setDataUser: (state: { email: string, displayName: string }) => void,
  showMessage: { show: boolean, text: string },
  setShowMessage: (state: { show: boolean, text: string }) => void,
  logoutUser: boolean,
  setLogoutUser: (state: boolean) => void,
  showForgotPassword: boolean,
  setShowForgotPassword: (state: boolean) => void,
}

const initialValue: DegeneratesContext = {
  dataUser: { email: '', displayName: '' },
  setDataUser: () => {},
  showMessage: { show: false, text: '' },
  setShowMessage: () => {},
  logoutUser: false,
  setLogoutUser: () => {},
  showForgotPassword: false,
  setShowForgotPassword: () => {},
}

const contexto = createContext(initialValue);
export default contexto;