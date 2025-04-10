'use client'
import React from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className={`relative text-white px-8 flex flex-col sm:flex-row justify-between items-center w-full py-2 z-5 bg-black`}>
      <div className="pl-0 sm:w-1/4 flex flex-row justify-center sm:justify-start p-2 my-4 sm:my-0">
        <Image
          alt="Logo dos Dados Degenerados"
          src="/images/dd_logo_sem_fundo.png"
          width="1000"
          height="1000"
          onClick={ () => router.push("/") }
          className="object-cover w-10 mt-2 mx-2 cursor-pointer"
        />
      </div>
      <div className="sm:w-3/4 text-sm">
        <p className="text-center sm:text-right w-full">© Dados Degenerados. Trademarks belong to their respective owners. All rights reserved.</p>
      </div>
    </footer>
  );
}