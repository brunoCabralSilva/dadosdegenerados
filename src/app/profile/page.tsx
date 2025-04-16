'use client'
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import ChangePassword from "@/components/changePassword";
import EditProfile from "@/components/editProfile";
import { IAuthenticate } from "@/interfaces";
import { FiEdit } from "react-icons/fi";
import EditProfileImage from "@/components/editProfileImage";
import MessageToUser from "@/components/messageToUser";

export default function Profile() {
  const {
    setRouterTo,
    userData, setUserData,
    showMessage, setShowMessage,
    showEditProfile, setShowEditProfile,
    showChangePassword, setShowChangePassword,
    showEditProfileImage, setShowEditProfileImage,
  } = useContext(contexto);
  const [showData, setShowData] = useState(false);
  const [dataUser, setDataUser] = useState({
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    imageURL: userData.imageURL,
    description: userData.description,
    role: userData.role,
  });
  const router = useRouter();

  useEffect(() => {
    setRouterTo('/profile');
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        if (userData.id === '') {
          const getUser = await getUserByEmail(auth.email, setShowMessage);
          if (getUser) {
            setUserData(getUser);
            setDataUser(getUser);
          }
        }
        setShowData(true);
      }
      else router.push("/");
    };
    authUser();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showEditProfile && <EditProfile setDataUser={setDataUser} /> }
      { showEditProfileImage && <EditProfileImage setDataUser={setDataUser} /> }
      { showChangePassword && <ChangePassword /> }
      { showMessage.show && <MessageToUser /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        {
            !showData 
              ? <div className="break-words h-screen flex items-center justify-center bg-dice w-full bg-center">
                  <Loading />               
                </div>
              : <div className="break-words w-full flex items-start h-full">
                  {
                    dataUser &&
                    <div className="break-words w-full h-full">
                      <div className="break-words w-full text-white">
                        <div className="break-words h-[35vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex items-center justify-center">
                          <Image
                            width={1000}
                            height={1000}
                            className="object-cover w-2/3 sm:w-1/5"
                            src="/images/dd_logo_completa_sem_fundo_preta.png"
                            alt={`Logo do Dados Degenerados`}
                          />
                        </div>
                        <div className="break-words mx-auto w-32 h-32 relative -mt-16  overflow-hidden flex items-center justify-center">
                          <div className="bg-black w-full h-full rounded-full">
                            {
                              dataUser.imageURL
                              && <Image
                                width={1000}
                                height={1000}
                                className="break-words object-cover w-full h-full rounded-full border-4 border-white bg-black"
                                src={dataUser.imageURL}
                                alt={`Imagem de perfil de ${dataUser.firstName}`}
                              />
                            }
                          </div>
                          <button
                            onClick={ () => setShowEditProfileImage(true) }
                            className="cursor-pointer text-white absolute bottom-0.5 right-0.5"
                          >
                            <FiEdit />
                          </button>
                        </div>
                        <div className="break-words w-full flex flex-col items-center justify-center mb-5">
                          <div className="break-words text-center mt-2 w-4/5 sm:w-2/3">
                            <h2 className="break-words font-semibold capitalize">
                              { dataUser.firstName } {dataUser.lastName}
                            </h2>
                            <p className="break-words text-white text-xs">
                              <span>{ dataUser.email  }</span>
                            </p>
                            <h2 className="font-semibold break-words mt-5">{
                              userData.description === '' || !userData.description
                              ? 'Ainda sem Bio'
                              : userData.description
                            }</h2>
                          </div>
                        </div>
                        <div className="break-words mt-2 flex items-center justify-center gap-2 px-2">
                          <button
                            onClick={ () => setShowEditProfile(true) }
                            className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative ease-in group-hover:bg-opacity-0"
                          >
                            Editar Perfil
                          </button>
                          <button
                            onClick={ () => setShowChangePassword(true) }
                            className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative ease-in group-hover:bg-opacity-0"
                          >
                            Alterar Senha
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
        }
      </div>
      <Footer />
    </div>
    );
  }