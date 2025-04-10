'use client'
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import { MdVideocam } from "react-icons/md";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import ChangePassword from "@/components/changePassword";
import EditProfile from "@/components/editProfile";

export default function Profile() {
  const {
    userData, setUserData,
    showEditProfile, setShowEditProfile,
    showChangePassword, setShowChangePassword,
    setShowMessage,
  } = useContext(contexto);
  const [showData, setShowData] = useState(false);
  const [dataUser, setDataUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    description: ''
  });
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      const auth: any = await authenticate(setShowMessage);
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
                        <div className="break-words mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden bg-black flex items-center justify-center">
                          {
                            dataUser.imageURL
                            && <Image
                              width={1000}
                              height={1000}
                              className="break-words object-cover w-full h-full"
                              src={dataUser.imageURL}
                              alt={`Imagem de perfil de ${dataUser.firstName}`}
                            />
                          }
                        </div>
                        <div className="break-words w-full flex flex-col items-center justify-center mb-5">
                          <div className="break-words text-center mt-2 w-4/5 sm:w-2/3">
                            <h2 className="break-words font-semibold capitalize">
                              { dataUser.firstName } {dataUser.lastName}
                            </h2>
                            <p className="break-words text-white text-xs">
                              <span>{ dataUser.email  }</span>
                            </p>
                            <h2 className="break-words mt-5">
                              { dataUser.description }
                            </h2>
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
                      {
                        // dataUser.typeUser === 'developer' &&
                        // <div>
                        //   {
                        //     listVideos.length > 0
                        //     ? <div className="break-words grid grid-cols-1 gap-5 cursor-pointer px-5">
                        //         <button
                        //           onClick={ () => setShowRegister(true) }
                        //           className="break-words relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                        //         >
                        //           <span className="break-words relative px-5 py-2.5 transition-all ease-in duration-75 text-white rounded-md group-hover:bg-opacity-0">
                        //             Carregar Vídeo
                        //           </span>
                        //         </button>
                        //         {
                        //           listVideos.map((itemVideo: any, index: number) => (
                        //             <ItemVideo
                        //               key={index}
                        //               itemVideo={itemVideo}
                        //               loggedUser={userData}
                        //             />
                        //           ))
                        //         }
                        //       </div>
                        //     : <div className="break-words w-full text-center">Nenhum video cadastrado. Que tal adicionar um vídeo ao seu perfil clicando <Link href="/home" className="break-words underline">aqui</Link>? </div>
                        //   }
                        // </div>
                      }
                    </div>
                  }
                </div>
        }
      </div>
      { showEditProfile && <EditProfile setDataUser={setDataUser} /> }
          {/* setShowEditProfile={setShowEditProfile}
          userData={userData}
          setUserData={setUserData} */}
      { showChangePassword && <ChangePassword /> }
      <Footer />
    </div>
    );
  }