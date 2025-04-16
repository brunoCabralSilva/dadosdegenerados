'use client'
import { ReactNode, useState } from 'react';
import contexto from './context';
import { IActivityRegisterWithId } from '@/interfaces';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  const [dataUser, setDataUser] = useState({ email: '', displayName: '' });
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  const [logoutUser, setLogoutUser] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    description: '',
    role: '',
  });
  const [showEditProfileImage, setShowEditProfileImage] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);
  const [routerTo, setRouterTo] = useState('/');
  const [showEditEvent, setShowEditEvent] = useState<{show: boolean, id: string }>({ show: false, id: '' });
  const [showDeleteEvent, setShowDeleteEvent] = useState<{show: boolean, id: string }>({ show: false, id: '' });
  const [showEditActivity, setShowEditActivity] = useState<{show: boolean, data: IActivityRegisterWithId }>(
    {
      show: false,
      data: {
        id: '',
        eventId: '',
        name: '',
        typeActivity: '',
        systemSession: { name: '', description: '' },
        slots: 0,
        noSlots: false,
        dates: [],
        description: '',
        sensibility: '',
      }
    });
  const [showDeleteActivity, setShowDeleteActivity] = useState<{show: boolean, id: string }>({ show: false, id: '' });
  const [showCreateActivity, setShowCreateActivity] = useState<{show: boolean, id: string }>({ show: false, id: '' });
  const [showSubscribe, setShowSubscribe] = useState<{show: boolean, id: string, email: string }>({ show: false, id: '', email: '' });

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
        showDeleteActivity, setShowDeleteActivity,
        showEditActivity, setShowEditActivity,
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

