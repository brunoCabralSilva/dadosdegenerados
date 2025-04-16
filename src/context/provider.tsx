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
  const [routerTo, setRouterTo] = useState('/');
  const [showEditEvent, setShowEditEvent] = useState({ show: false, id: '' });
  const [showDeleteEvent, setShowDeleteEvent] = useState({ show: false, id: '' });
  const [showCreateActivity, setShowCreateActivity] = useState({ show: false, id: '' });
  const [showSubscribe, setShowSubscribe] = useState({ show: false, id: '' });

  return (
    <contexto.Provider
      value={{
        routerTo, setRouterTo,
        userData, setUserData,
        dataUser, setDataUser,
        logoutUser, setLogoutUser,
        showMessage, setShowMessage,
        showEditEvent, setShowEditEvent,
        showSubscribe, setShowSubscribe,
        showCreateEvent, setShowCreateEvent,
        showEditProfile, setShowEditProfile,
        showDeleteEvent, setShowDeleteEvent,
        showCreateActivity, setShowCreateActivity,
        showChangePassword, setShowChangePassword,
        showForgotPassword, setShowForgotPassword,
        showEditProfileImage, setShowEditProfileImage,
      }}
    >
      {children}
    </contexto.Provider>
  );
}

