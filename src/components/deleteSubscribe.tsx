'use client'
import contexto from '@/context/context';
import { authenticate } from '@/firebase/authenticate';
import { deleteSubscribeByEventIdAndEmail } from '@/firebase/subscribes';
import { IAuthenticate } from '@/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function DeleteSubscribe() {
  const router = useRouter();
  const {
    showDeleteSubscribe, setShowDeleteSubscribe,
    setShowMessage,
  } = useContext(contexto);

  const deleteSubscribe = async () => {
    const auth: IAuthenticate | null = await authenticate(setShowMessage);
    if (auth) {
      await deleteSubscribeByEventIdAndEmail(showDeleteSubscribe.id, auth.email, setShowMessage);
      router.push('/events');
      setShowDeleteSubscribe({ show: false, id: '' });
    }
  };

  return(
    <div className="z-[80] fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 px-3 sm:px-0">
      <div className="w-full sm:w-2/3 md:w-1/2 flex flex-col justify-center items-center bg-black relative border-white border-2 ">
        <div className="bg-[url(/images/dd_logo_bg_black.png)] h-full w-full pb-5 flex flex-col items-center justify-center relative">
          <div className="pt-4 sm:pt-2 px-2 w-full flex justify-end absolute top-0 right-0">
            <IoIosCloseCircleOutline
              className="text-4xl text-white cursor-pointer"
              onClick={ () => setShowDeleteSubscribe({ show: false, id: '' }) }
            />
          </div>
          <div className="pb-5 px-5 w-full py-10 flex flex-col items-center justify-center">
            <Image
              src="/images/dd_logo_sem_fundo.png"
              alt="Logo do Dados Degenerados"
              className="w-12 relative object-contain mb-5"
              width={35}
              height={400}
            />
            <label htmlFor="palavra-passe" className="flex flex-col items-center w-full">
              <p className="text-white w-full text-center pb-3 pt-5">
                Tem certeza de que deseja cancelar sua inscrição? Vamos sentir muito a sua falta, pois sua presença é muito importante para o nosso evento. Ao confirmar o cancelamento, todos os dados fornecidos na sua inscrição serão permanentemente excluídos.
              </p>
            </label>
            <div className="flex w-full gap-2">
              <button
              type="button"
              onClick={() => setShowDeleteSubscribe({ show: false, id: '' }) }
              className={`text-white  transition-colors bg-green-900 hover:border-green-900 cursor-pointer border-2 border-white w-full p-2 mt-6 font-bold`}
              >
                Não Cancelar
              </button>
              <button
                type="button"
                onClick={ deleteSubscribe }
                className={`text-white bg-red-800 hover:border-red-900 transition-colors cursor-pointer border-2 border-white w-full p-2 mt-6 font-bold`}
              >
                Cancelar Inscrição
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}