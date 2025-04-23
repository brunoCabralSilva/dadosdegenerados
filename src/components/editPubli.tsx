'use client'
import contexto from "@/context/context";
import { authenticate } from "@/firebase/authenticate";
import { updateBlogById } from "@/firebase/blog";
import { IAuthenticate, IBlogWithId } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function EditPubli(
  props: { dataBlog: IBlogWithId }
) {
  const { dataBlog } = props;
  const { setShowMessage, setShowEditPubli } = useContext(contexto);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTitle(dataBlog.title);
    setText(dataBlog.text);
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };
  
  const updateUser = async () => {
    setLoading(true);
    if(!title && title.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Título para a Publicação com mais de 2 caracteres.'});
    } else if (!text && text.length < 20) {
      setShowMessage({ show: true, text: 'Necessário inserir um texto para a Publicação com pelo menos 20 caracteres.' });
    } else if (!imageFile) {
      setShowMessage({ show: true, text: 'Necessário inserir uma imagem para a Publicação.' });
    } else {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        await updateBlogById({
          id: dataBlog.id,
          title,
          text,
          author: auth.displayName,
          imageURL: imageFile ? imageFile : dataBlog.imageURL,
        }, setShowMessage);
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <div className="break-words z-20 fixed top-0 left-0 w-full flex items-start justify-center bg-[url(/images/dd_logo_bg_black.png)] py-2 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-full lex flex-col justify-center items-center min-h-screen relative border-white border-2 mx-1 pb-5 mt-10">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowEditPubli(false) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Editar Publicação
            </div>
            <div className="break-words w-full">
              <label htmlFor="title" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Título da Publicação *</p>
                <input
                  type="text"
                  id="title"
                  value={ title }
                  placeholder="Digite o nome do Evento"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) }
                />
              </label>
            </div>
            <label htmlFor="text" className="break-words my-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Texto *</p>
              <textarea
                id="text"
                rows={7}
                value={ text }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none whitespace-pre-line"
                placeholder="Digite seu texto aqui..."
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(e.target.value) }
              />
            </label>
            <label htmlFor="imageFile" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Adicione uma nova Imagem para substituir a anterior, caso deseje</p>
              <input
                type="file"
                id="imageFile"
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Cole aqui o link do maps"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImage(e) }
              />
            </label>
            <button
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
              onClick={ updateUser }
            >
              { loading ? 'Atualizando, aguarde...' : 'Atualizar' }
            </button>
          </div>
        </div>    
      </div>
    </div>
  );
}