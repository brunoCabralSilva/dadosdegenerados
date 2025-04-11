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
  showEditProfileImage: boolean,
  setShowEditProfileImage: (state: boolean) => void,
  showChangePassword: boolean,
  setShowChangePassword: (state: boolean) => void,
  showCreateEvent: boolean,
  setShowCreateEvent: (state: boolean) => void,
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
    role: '',
  },
  setUserData : () => {},
  showEditProfile: false,
  setShowEditProfile: () => {},
  showEditProfileImage: false,
  setShowEditProfileImage: () => {},
  showChangePassword: false,
  setShowChangePassword: () => {},
  showCreateEvent: false,
  setShowCreateEvent: () => {},
}

const contexto = createContext(initialValue);
export default contexto;