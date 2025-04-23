'use client'
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import { IAuthenticate, IBlogWithId } from "@/interfaces";
import MessageToUser from "@/components/messageToUser";
import CreatePubli from "@/components/createPubli";
import { getAllBlogs } from "@/firebase/blog";
import { useRouter } from "next/navigation";

export default function Blogs() {
  const {
    setRouterTo,
    userData, setUserData,
    showCreatePubli, setShowCreatePubli,
    showMessage, setShowMessage,
  } = useContext(contexto);
  const router = useRouter();
  const [showData, setShowData] = useState(false);
  const [list, setList] = useState<IBlogWithId[]>([]);

  useEffect(() => {
    setRouterTo('/blog');
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        if (userData.id === '') {
          const getUser = await getUserByEmail(auth.email, setShowMessage);
          if (getUser) setUserData(getUser);
        }
        setShowData(true);
      }
    };
    const getAll = async () => {
      const getList = await getAllBlogs(setShowMessage);
      setList(getList);
    }
    getAll();
    authUser();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      { showCreatePubli && <CreatePubli /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        {
          !showData
          ? <div className="break-words h-screen flex items-center justify-center bg-dice w-full bg-center">
              <Loading />               
            </div>
          : <div className="flex flex-col items-start h-full break-words w-full text-white">
              <div className="break-words h-[35vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex items-center justify-center w-full">
                <Image
                  width={1000}
                  height={1000}
                  className="object-cover w-2/3 sm:w-1/5"
                  src="/images/dd_logo_completa_sem_fundo_preta.png"
                  alt={`Logo do Dados Degenerados`}
                />
              </div>
              <div className="w-full px-3 pt-5 pb-3 flex justify-between items-center">
                <p className="font-bold text-xl">Blog</p>
                {
                  userData.role === 'admin' &&
                  <button
                    onClick={ () => setShowCreatePubli(true) }
                    className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative ease-in group-hover:bg-opacity-0"
                  >
                    Criar Publicação
                  </button>
                }
              </div>
              <div className="w-full px-3">
                <hr />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 px-3 w-full gap-3">
                {
                  list.length > 0 &&
                  list.map((blog: IBlogWithId, index: number) => (
                    <button
                      key={ index }
                      type="button"
                      onClick={ () => router.push(`/blog/${blog.id}`) }
                      className="flex flex-col cursor-pointer relative w-full h-[40vh]"
                    >
                      <Image
                        alt="Imagem da Publicação"
                        src={ blog.imageURL }
                        width="1000"
                        height="1000"
                        className="object-cover w-full absolute h-[40vh]"
                      />
                      <div className="h-[40vh] bg-linear-to-t from-black to-transparent w-full absolute bottom-0" />
                      <div className="w-full relative h-full flex flex-col justify-end p-2">
                        <p className="text-xl w-full text-left font-bold leading-snug">{ blog.title }</p>
                        <div className="w-full text-left leading-snug text-sm">
                          <span className="font-bold pr-1">Publicado em:</span>
                          <span>{ blog.date }</span>
                        </div>
                        <div className="w-full text-left leading-snug text-sm">
                          <span className="font-bold pr-1">Autor:</span>
                          <span>{ blog.author }</span>
                        </div>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
        }
      </div>
      <Footer />
    </div>
    );
  }