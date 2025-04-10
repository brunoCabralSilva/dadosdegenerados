'use client'
import { registerUser } from '@/firebase/user';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBackward } from "react-icons/fa6";
import Loading from '@/components/loading';
import contexto from '@/context/context';
import { authenticate } from '@/firebase/authenticate';
import MessageToUser from '@/components/messageToUser';
import Image from 'next/image';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setDataUser, setShowMessage, showMessage } = useContext(contexto);

  const handleRegisterDev = async () => {
    const validate = /\S+@\S+\.\S+/;
    const vEmail = !email || !validate.test(email) || email === '';
    if (firstName.length < 2 ) {
      setShowMessage({ show: true, text: 'Necessário preencher um Nome com mais de 2 caracteres' });
    } else if (lastName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário preencher um Sobrenome com mais de 2 caracteres' });
    } else if(vEmail) {
      setShowMessage({ show: true, text: 'Necessário preencher um Email válido' });
    } else if(image === null) {
      setShowMessage({ show: true, text: 'Necessário escolher uma imagem de perfil' });
    } else if (!password || password.length < 6) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Senha com pelo menos 6 dígitos' });
    } else if (password !== password2) {
      setShowMessage({ show: true, text: 'As senhas inseridas não conferem' });
    } else {
      setLoading(true);
      const reg = await registerUser(
        email,
        password,
        firstName,
        lastName,
        image,
        setShowMessage,
      );
      if (reg) {
        const data = await authenticate(setShowMessage);
        if (data) {
          setDataUser({ email: data.email, displayName: data.displayName });
        }
        router.push('/');
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    }
    setLoading(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return(
    <section className="bg-ritual break-words bg-dice bg-center bg-fixed min-h-screen w-full items-center justify-center">
    { showMessage.show && <MessageToUser /> }
    <div className="break-words bg-black/95 flex flex-col items-center justify-center px-2 sm:px-6 py-8 mx-auto h-full lg:py-0">
       <div className="break-words md:my-5 w-full rounded-lg shadow">
          <div className="flex justify-center w-full">
            <Image
              src="/images/dd_logo_sem_fundo.png"
              alt="Glifo de um lobo"
              className="w-14 relative object-contain mb-5"
              width={1000}
              height={1000}
            />
          </div>
          <div className="break-words p-4">
            <div className="break-words flex items-center justify-between w-full mb-6 sm:mb-0">
              <h1 className="break-words text-xl font-bold leading-tight tracking-tight md:text-2xl text-white mb-5">
                Cadastro
              </h1>
              <FaBackward
                className="break-words text-white hover:text-red-500 transition-colors sm:text-3xl text-2xl cursor-pointer"
                onClick={ () => router.push('/login') }
              />
            </div>
            <div className="break-words w-full">
            <div>
              <div className="break-words mb-5">
                <label htmlFor="firstName" className="break-words block mb-2 text-sm font-medium text-white">Nome</label>
                <input 
                  type="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value.toLowerCase())}
                  className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" 
                  placeholder="Insira seu primeiro nome" 
                  required 
                />
              </div>
              <div className="break-words mb-5">
                <label htmlFor="lastName" className="break-words block mb-2 text-sm font-medium text-white">Sobrenome</label>
                <input 
                  type="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.toLowerCase())}
                  className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400" 
                  placeholder="Insira seu último nome" 
                  required 
                />
              </div>
            </div>
              <div className="break-words mb-5">
                <label htmlFor="email" className="break-words block mb-2 text-sm font-medium text-white">Email</label>
                <input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block p-2.5 placeholder-gray-400 w-full" 
                  placeholder="name@flowbite.com" 
                  required 
                />
              </div>
              <div className="break-words mb-5">
                <label htmlFor="description" className="break-words block mb-2 text-sm font-medium text-white">Escolha uma Imagem de perfil</label>
                  <input 
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImage}
                    className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                  />
              </div>
              <div className="break-words mb-5">
                <label htmlFor="password" className="break-words block mb-2 text-sm font-medium text-white">Senha</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                  placeholder="••••••" 
                  required 
                />
              </div>
              <div className="break-words mb-5">
                <label htmlFor="repeat-password" className="break-words block mb-2 text-sm font-medium text-white">Repita a Senha</label>
                <input 
                  type="password" 
                  id="repeat-password" 
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                  placeholder="••••••" 
                  required 
                />
              </div>
              <button 
                type="button"
                onClick={ handleRegisterDev }
                className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer w-full bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <span className="break-words relative px-5 py-2.5 transition-all ease-in duration-75 text-white rounded-md group-hover:bg-opacity-0">
                  { loading ? 'Registrando, por favor aguarde' : 'Registrar' }
                </span>
              </button>
            </div>
          { loading && <Loading /> }
          </div>
        </div>
      </div> 
    </section>
  );
}
  
  export default Register;