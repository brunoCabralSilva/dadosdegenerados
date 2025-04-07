import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url(/images/dd_logo_bg_black.png)]">
      <Nav />
      <div className="flex fixed top-0 left-0 bg-black bg-center w-full items-center pb-2">
        <Image
          alt="Logo dos Dados Degenerados"
          src="/images/dd_logo_sem_fundo.png"
          width="1000"
          height="1000"
          className="object-cover w-10 mt-2 mx-2"
        />
      </div>
      <div className="w-full flex flex-col items-center mt-10 justify-center bg-[url(/images/dd_logo_bg_black.png)] bg-cover bg-green-800 py-10">
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
      <div className="bg-black h-screen w-full">
        Aqui
      </div>
      <Footer />
    </div>
  );
}
