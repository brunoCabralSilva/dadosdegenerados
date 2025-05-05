'use client'
// import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import { IAuthenticate } from "@/interfaces";
import MessageToUser from "@/components/messageToUser";

export default function Sessions() {
  const {
    setRouterTo,
    userData, setUserData,
    showMessage, setShowMessage,
  } = useContext(contexto);
  useEffect(() => {
    setRouterTo('/media');
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        if (userData.id === '') {
          const getUser = await getUserByEmail(auth.email, setShowMessage);
          if (getUser) setUserData(getUser);
        }
      }
    };
    authUser();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        <div className="flex flex-col items-start h-full break-words w-full text-white">
          <div className="break-words h-[50vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex items-center justify-center w-full">
            <Image
              width={1000}
              height={1000}
              className="object-cover w-2/3 sm:w-1/5"
              src="/images/dd_logo_completa_sem_fundo_preta.png"
              alt={`Logo do Dados Degenerados`}
            />
          </div>
          <div className="w-full px-3 pt-5 pb-3 flex justify-between items-center">
            <p className="font-bold text-xl">Sessões</p>
            {
              userData.role === 'admin' &&
              <button
                // onClick={ () => setShowCreateEvent(true) }
                className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative ease-in group-hover:bg-opacity-0"
              >
                Adicionar Sessão
              </button>
            }
          </div>
          <div className="w-full px-3">
            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
  }