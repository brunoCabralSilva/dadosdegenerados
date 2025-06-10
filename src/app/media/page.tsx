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
import ImageGrid from "@/components/ImageGrid";
import ImageZoom from "@/components/ImageZoom";

export default function Media() {
  const {
    imageZoom,
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
      { imageZoom !== '' && <ImageZoom /> }
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
            <p className="font-bold text-xl">Mídia</p>
          </div>
          <div className="w-full px-3">
            <hr />
          </div>
          <div>
            <ImageGrid
              folderPath="/images/events"
              totalImages={99}
              oddImagesLandscape={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
  }