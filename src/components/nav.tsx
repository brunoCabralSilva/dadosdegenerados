'use client'
import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import { authenticate } from '@/firebase/authenticate';
import { useRouter } from 'next/navigation';
import contexto from '@/context/context';
import Logout from './logout';
import Image from 'next/image';

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [loginLogout, setLoginLogout] = useState('');
  const router = useRouter();
  const { logoutUser, setLogoutUser, setShowMessage } = useContext(contexto);

  useEffect(() => {
    const fetchData = async () => {
      const authData = await authenticate(setShowMessage);
      if (authData && authData.email && authData.displayName) {
        setLoginLogout('logout');
      } else setLoginLogout('login');
    };
    console.log(loginLogout);
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barra1 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500 z-0';
    } return 'rotate-45 transition duration-500 translate-y-2 z-50';
  }

  const barra2 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500 z-0';
    } return '-rotate-45 transition duration-500 z-50';
  }

  const barra3 = () => {
    if(!showMenu) {
      return 'opacity-100 transition duration-500 z-0';
    } return 'opacity-0 transition duration-500 z-50';
  }

  return (
    <nav className="w-full text-base relative 2xl:text-xl leading-6 z-40">
      { logoutUser && <Logout /> }
      <div className="z-30 flex fixed top-0 left-0 bg-black bg-center w-full items-center pb-2 justify-between">
        <Image
          alt="Logo dos Dados Degenerados"
          src="/images/dd_logo_sem_fundo.png"
          width="1000"
          height="1000"
          onClick={ () => router.push("/") }
          className="object-cover w-10 mt-2 mx-2 cursor-pointer"
        />
        <div
          onClick={ () => setShowMenu(!showMenu) }
          className="px-2 pt-2 pb-1 rounded cursor-pointer fixed right-0 top-0 sm:mt-1 sm:mr-2 flex flex-col z-50"
        >
          <div className={`h-1 w-9 bg-white mb-1 ${barra1()}`} />
          <div className={`h-1 w-9 bg-white mb-1 ${barra2()}`} />
          <div className={`h-1 w-9 bg-white mb-1 ${barra3()}`} />
        </div>
      </div>
      { showMenu &&
        <ul
          className={`fixed top-0 right-0 z-20 w-full sm:w-1/2 md:w-1/4 h-screen items-center pt-2 transition duration-500 flex flex-col text-white justify-center font-bold border-l border-white bg-[url(/images/dd_logo_bg_black.png)]`}
        >
          <li>
            <Link
              href="/"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Início
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/events"
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Eventos
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/sessions"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Sessões
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/blog"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Blog
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/media"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Mídia
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/about"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Quem Somos
            </Link>
          </li>
          <li className="pt-4">
            <Link href="/profile"
              onClick={ () => setShowMenu(!showMenu) }
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Perfil
            </Link>
          </li>
          <li className="pt-10">
          <button
              type="button"
              onClick={ async () => {
                if (loginLogout === 'login') router.push('/login');
                else setLogoutUser(true)
              }}
              className="transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              { loginLogout === 'logout' && 'Logout' }
              { loginLogout === 'login' && 'Login' }
            </button>
          </li>
        </ul>
      }
    </nav>
  );
}