'use client'
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[url(/images/dd_logo_bg_black.png)]">
      <Nav />
      <div className="w-full flex flex-col items-center justify-center bg-[url(/images/dd_logo_bg_black.png)] bg-cover bg-black h-screen">
        <Image
          alt="Logo dos Dados Degenerados"
          src="/images/dd_logo_completa_sem_fundo.png"
          width="1000"
          height="1000"
          className="object-contain w-4/5 sm:w-2/5 object-top mt-10 mb-5"
        />
        <div className="flex flex-col items-center justify-center mt-5 w-full">
          <Image
            alt="Logo dos Dados Degenerados"
            src="/images/você está pronto para.png"
            width="1000"
            height="1000"
            className="object-contain w-9/12 sm:w-2/12"
          />
          <Image
            alt="Logo dos Dados Degenerados"
            src="/images/degenerar-se.png"
            width="1000"
            height="1000"
            className="object-contain w-8/12 sm:w-2/12"
          />
        </div>
      </div>
      <div className="bg-black grid grid-cols-2 sm:grid-cols-8 w-full h-full px-4 sm:px-8 pb-4 gap-4 sm:gap-6 py-5">
        <Link href="/events" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-[url(/images/degenerados.jpeg)] bg-center bg-cover h-full sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2 relative">Eventos</p>
          </div>
        </Link>
        <Link href="/sessions" className="col-span-1 sm:col-span-2 sm:row-span-4">
          <div
            className={`bg-[url(/images/degenerados3.jpeg)] bg-cover bg-center h-[20vh] sm:h-full text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2">Sessões</p>
          </div>
        </Link>
        <Link href="/blog" className="col-span-2 sm:col-span-4 sm:row-span-2">
          <div
            className={`bg-[url(/images/degenerados6.jpeg)] bg-cover bg-center h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2">Blog</p>
          </div>
        </Link>
        <Link href="/media" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-[url(/images/degenerados7.jpeg)] bg-cover h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer bg-center border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2 relative">Mídia</p>
          </div>
        </Link>
        <Link href="/profile" className="col-span-1 sm:row-span-2 sm:col-span-2">
          <div
            className={`bg-[url(/images/degenerados8.jpeg)] bg-top bg-cover h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2">Perfil</p>
          </div>
        </Link>
        <Link href="/about" className="row-span-2 col-span-2">
          <div
            className={`bg-[url(/images/degenerados4.jpeg)] bg-center bg-cover h-[20vh] sm:h-[40vh] text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-lg px-3 p-2">Quem Somos</p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
