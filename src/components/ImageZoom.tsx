'use client'
import contexto from '@/context/context';
import Image from 'next/image';
import { useContext } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ImageZoom() {
  const { imageZoom, setImageZoom } = useContext(contexto);
  return(
    <div className="z-[80] fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 px-3 sm:px-0">
      <div className="w-full h-screen flex flex-col justify-start items-center bg-black/80 relative">
        <div className="pt-4 sm:pt-2 px-2 w-full flex justify-end right-0 h-[10vh]">
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={() => setImageZoom('')}
          />
        </div>
        <div className="px-5 w-full flex flex-col items-center justify-center h-[85vh]">
          <Image
            src={ imageZoom }
            alt="Imagem selecionada pelo usuário"
            className="w-full h-full object-contain"
            width={3000}
            height={3000}
          />
        </div>
      </div>
    </div>
  );
}