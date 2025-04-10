'use client'
import { IUserData } from '@/interfaces';
import { createContext } from 'react';

interface DegeneratesContext {
  dataUser: { email: string, displayName: string },
  setDataUser: (state: { email: string, displayName: string }) => void,
  showMessage: { show: boolean, text: string },
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
  logoutUser: boolean,
  setLogoutUser: (state: boolean) => void,
  showForgotPassword: boolean,
  setShowForgotPassword: (state: boolean) => void,
  userData: IUserData,
  setUserData: (state: IUserData) => void,
  showEditProfile: boolean,
  setShowEditProfile: (state: boolean) => void,
  showChangePassword: boolean,
  setShowChangePassword: (state: boolean) => void,
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
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    description: '',
  },
  setUserData : () => {},
  showEditProfile: false,
  setShowEditProfile: () => {},
  showChangePassword: false,
  setShowChangePassword: () => {},
}

const contexto = createContext(initialValue);
export default contexto;