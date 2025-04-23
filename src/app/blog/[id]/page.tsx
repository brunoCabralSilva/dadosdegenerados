'use client'
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import Nav from "@/components/nav";
import { IAuthenticate, IBlogWithId } from "@/interfaces";
import MessageToUser from "@/components/messageToUser";
import contexto from "@/context/context";
import { useParams } from "next/navigation";
import { getBlogsById } from "@/firebase/blog";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import DeletePubli from "@/components/deletePubli";
import EditPubli from "@/components/editPubli";

export default function BlogId() {
  const params = useParams();
  const blogId = params?.id as string;
  const {
    setRouterTo,
    userData, setUserData,
    showEditPubli, setShowEditPubli,
    showDeletePubli, setShowDeletePubli,
    showMessage, setShowMessage,
  } = useContext(contexto);
  const [showData, setShowData] = useState(false);
  const [dataBlog, setDataBlog] = useState<IBlogWithId>({
    id: '',
    title: '',
    author: '',
    date: '',
    text: '',
    imageURL: '',
  });

  useEffect(() => {
    setRouterTo('/blog/' + blogId);
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
      const getBlog = await getBlogsById(blogId, setShowMessage);
      if (getBlog) setDataBlog(getBlog);
    }
    getAll();
    authUser();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      { showEditPubli && <EditPubli dataBlog={dataBlog} /> }
      { showDeletePubli && <DeletePubli id={dataBlog.id} /> }
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
              {
                dataBlog &&
                <div className="w-full">
                  <div className="w-full px-3 pt-5 pb-3 flex justify-between items-center">
                    <div className="mb-1 w-full">
                      <p className="font-bold text-2xl mt-5 leading-6">{ dataBlog.title }</p>
                      <span className="leading-snug text-xs">{ dataBlog.author }, { dataBlog.date }</span>
                    </div>
                    {
                      userData.role === 'admin' &&
                      <div className="text-white flex gap-2 justify-end mb-3 sm:mb-0">
                        <button
                          type="button"
                          onClick={ () => setShowEditPubli(true) }
                          className="text-2xl cursor-pointer"
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          onClick={ () => setShowDeletePubli(true) }
                          className="text-2xl cursor-pointer"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    }
                  </div>
                  <div className="w-full h-full px-3">
                    <Image
                      width={500}
                      height={500}
                      className="float-left w-full sm:w-1/2 mr-4 sm:mb-2 object-cover mb-5"
                      src={dataBlog.imageURL}
                      alt="Imagem do blog"
                    />
                    <p className="whitespace-pre-line text-justify sm:mt-0 px-1 sm:px-0">
                      {dataBlog.text}
                    </p>
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