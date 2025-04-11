'use client'
import { ReactNode, useState } from 'react';
import contexto from './context';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  const [dataUser, setDataUser] = useState({ email: '', displayName: '' });
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  const [logoutUser, setLogoutUser] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    description: '',
    role: '',
  });
  const [showEditProfileImage, setShowEditProfileImage] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  return (
    <contexto.Provider
      value={{
        dataUser, setDataUser,
        showMessage, setShowMessage,
        logoutUser, setLogoutUser,
        showForgotPassword, setShowForgotPassword,
        showEditProfileImage, setShowEditProfileImage,
        userData, setUserData,
        showEditProfile, setShowEditProfile,
        showChangePassword, setShowChangePassword,
        showCreateEvent, setShowCreateEvent,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

