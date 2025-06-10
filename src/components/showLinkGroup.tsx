'use client'
import Image from 'next/image';

export default function ShowLinkGroup() {
  return(
    <div className="z-[80] fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/99 px-3 sm:px-0">
      <div className="w-full sm:w-2/3 md:w-1/2 flex flex-col justify-center items-center bg-black relative border-white border-2">
        <div className="bg-[url(/images/dd_logo_bg_black.png)] h-full w-full pb-5 flex flex-col items-center justify-center relative">
          <div className="px-5 w-full flex flex-col items-center justify-center py-5">
            <Image
              src="/images/dd_logo_sem_fundo.png"
              alt="Glifo de um lobo"
              className="w-12 relative object-contain mb-5"
              width={35}
              height={400}
            />
            <label htmlFor="palavra-passe" className="flex flex-col items-center w-full">
              <p className="text-white w-full text-center font-bold">
                Sua inscrição foi concluída com sucesso! Agora você pode acompanhar todas as novidades do evento, conhecer o nosso grupo Degenerado e se conectar com a nossa comunidade. Clique no botão abaixo e junte-se a nós:
              </p>
            </label>
            <div>
              <button
                type="button"
                onClick={() => {
                  window.open('https://chat.whatsapp.com/BteYsj4HDlq0qQT4RtO6FN', '_blank');
                  window.location.reload();
                }}
                className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative mt-5 flex flex-col"
              >
                <span>Entrar no Grupo de WhatsApp</span>
                <span>do Coletivo Dados Degenerados</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}