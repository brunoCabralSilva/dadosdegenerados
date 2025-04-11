'use client'
import contexto from "@/context/context";
import { updateUserById } from "@/firebase/user";
import { IUserData } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function EditProfile(props: { setDataUser: React.Dispatch<React.SetStateAction<IUserData>> }) {
  const { setDataUser } = props;
  const {
    userData, setUserData,
    setShowEditProfile,
    setShowMessage
  } = useContext(contexto);
  const [prevFirstName, setPrevFirstName] = useState('');
  const [prevLastName, setPrevLastName] = useState('');
  const [prevDescription, setPrevDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrevFirstName(userData.firstName);
    setPrevLastName(userData.lastName);
    setPrevDescription(userData.description);
  }, []);
  
  const updateUser = async () => {
    setLoading(true);
    console.log(prevLastName);
    if (!prevFirstName || prevFirstName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Nome com mais de 2 caracteres' });
    } else if(!prevLastName || prevLastName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Sobrenome com mais de 2 caracteres' });
    } else {
      const updtUser = await updateUserById({
        id: userData.id,
        firstName: prevFirstName,
        lastName: prevLastName,
        description: prevDescription
      }, setShowMessage);
       if (updtUser) {
        setUserData({ ...userData, firstName: prevFirstName, lastName: prevLastName, description: prevDescription });
        setDataUser({ ...userData, firstName: prevFirstName, lastName: prevLastName, description: prevDescription });
       }
      setShowEditProfile(false);
    }
    setLoading(false);
  };

  return (
    <div className="break-words z-50 fixed top-0 left-0 w-full flex items-start justify-center bg-[url(/images/dd_logo_bg_black.png)] py-2 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-full lex flex-col justify-center items-center min-h-screen relative border-white border-2 mx-1 pb-5">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowEditProfile(false) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Editar Perfil
            </div>
            <div className="break-words w-full">
              <label htmlFor="firstName" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Nome</p>
                <input
                  type="text"
                  id="firstName"
                  value={ prevFirstName }
                  placeholder="Nome"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-center outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPrevFirstName(e.target.value) }
                />
              </label>
              <label htmlFor="lastName" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Sobrenome</p>
                <input
                  type="text"
                  id="lastName"
                  value={ prevLastName }
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-center outline-none"
                  placeholder="Sobrenome"
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPrevLastName(e.target.value) }
                />
              </label>
            </div>
            <label htmlFor="bio" className="break-words mb-4 flex flex-col items-center w-full">
              <p className="break-words w-full mb-1 text-white">Bio</p>
              <textarea
                id="bio"
                rows={7}
                value={ prevDescription }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Fale um pouco sobre você"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPrevDescription(e.target.value) }
              />
            </label>
            <div className="break-words grid grid-cols-2 w-full gap-3">
              <button
              className="break-words text-white hover:text-red-500 transition-colors cursor-pointer border-2 border-red-500 w-full p-2 mt-6 font-bold bg-black"
              onClick={() => setShowEditProfile(false) }
              >
                Cancelar
              </button>
              <button
                className="break-words text-white hover:text-green-500 transition-colors cursor-pointer border-2 border-green-500 w-full p-2 mt-6 font-bold bg-black"
                onClick={ updateUser }
              >
                Salvar
              </button>
            </div>
          </div>
          {
            loading
            && <div className="break-words bg-black/80 text-white flex items-center justify-center flex-col my-5">
              <span className="break-words loader z-50" />
            </div>
          }
        </div>    
      </div>
    </div>
  );
}