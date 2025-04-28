'use client'
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import { IAuthenticate } from "@/interfaces";
import MessageToUser from "@/components/messageToUser";
import admins from '../admins.json';
import objetives from '../objectives.json';

export default function About() {
  const {
    setRouterTo,
    userData, setUserData,
    showMessage, setShowMessage,
  } = useContext(contexto);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setRouterTo('/about');
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
    authUser();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10      min-h-screen mt-11">
        {
          !showData
          ? <div className="break-words h-screen flex items-center justify-center bg-dice w-full bg-center">
              <Loading />               
            </div>
          : <div className="flex flex-col items-start h-full break-words w-full text-white">
              <div className="break-words bg-[url(/images/dd_logo_bg_black.png)] bg-cover flex flex-col items-center justify-center w-full h-screen relative">
                <Image
                  width={1000}
                  height={1000}
                  className="float-left object-cover w-full h-full bg-black opacity-20 absolute z-10"
                  src={`/images/degenerados4.jpeg`}
                  alt={`Imagem do Grupo reunido`}
                />
                <Image
                  width={1000}
                  height={1000}
                  className="object-cover w-2/5 sm:w-1/5 z-20"
                  src="/images/dd_logo_white.png"
                  alt={`Logo do Dados Degenerados`}
                />
                <div className="text-3xl sm:text-6xl mt-5 sickamore">Quem Somos?</div>
              </div>
              <div className="flex flex-col items-center justify-center pt-24 pb-20 w-full bg-[url(/images/dd_logo_bg_black.png)]">
                <Image
                  alt="Logo dos Dados Degenerados"
                  src="/images/você está pronto para.png"
                  width="1000"
                  height="1000"
                  className="object-contain w-9/12 sm:w-4/12"
                />
                <Image
                  alt="Logo dos Dados Degenerados"
                  src="/images/degenerar-se.png"
                  width="1000"
                  height="1000"
                  className="object-contain w-8/12 sm:w-4/12"
                />
              </div>
              <div className="px-10 w-full">
                <div className="flex px-3 mt-5 w-full text-center brookline text-3xl py-10 items-center">
                  <hr className="text-white bg-white flex-1" />
                  <div className="px-4 whitespace-nowrap">Afinal, o que é o Coletivo Dados Degenerados?</div>
                  <hr className="text-white bg-white flex-1" />
                </div>
                <div className="mt-5 px-3">
                  <div className="flex items-center gap-5">
                    <Image
                      width={1000}
                      height={1000}
                      className="object-cover w-1/2 bg-black ml-3"
                      src={`/images/degenerados0.jpeg`}
                      alt={`Imagem do Grupo reunido`}
                    />
                    <p className="w-1/2">
                      O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                    </p>
                  </div>
                  <div className="flex items-center gap-5 mt-5">
                    <p className="w-1/2">
                      O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                    </p>
                    <Image
                      width={1000}
                      height={1000}
                      className="object-cover w-1/2 bg-black mr-4 my-3"
                      src={`/images/degenerados4.jpeg`}
                      alt={`Imagem do Grupo reunido`}
                    />
                  </div>
                </div>
                <div className="flex px-3 mt-5 w-full text-center brookline text-3xl py-5 items-center">
                  <div className="h-0.5 w-full bg-white hidden sm:flex" />
                  <div className="w-full">Conheça nossos Objetivos:</div>
                  <div className="h-0.5 w-full bg-white hidden sm:flex" />
                </div>
                <div className="h-full bg-[url(/images/dd_logo_bg_black.png)] bg-center bg-cover p-5 sm:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                  {
                    objetives && admins.length > 0 &&
                    objetives.map((obj: { name: string, imageURL: string, description: string }, index: number) => (
                      <div
                        key={ index }
                        className="flex flex-col gap-2 w-full items-center text-white bg-black bg-center relative"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          className="h-full w-full absolute z-10"
                          src={`/images/dd_logo_bg_black.png`}
                          alt=""
                        />
                        <div className="flex flex-col w-full h-full p-8 z-20">
                          <Image
                            width={1000}
                            height={1000}
                            className="object-contain w-full bg-black"
                            src={`/images/${obj.imageURL}`}
                            alt=""
                          />
                          <div className="w-full">
                            <p className="text-xl font-bold brookline py-4 pb-2">
                              {obj.name}
                            </p>
                            <div className="text-sm leading-4">{obj.description}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex px-3 mt-5 w-full text-center brookline text-3xl py-5 items-center">
                  <div className="h-0.5 w-full bg-white hidden sm:flex" />
                  <div className="w-full">Conheça nossos organizadores:</div>
                  <div className="h-0.5 w-full bg-white hidden sm:flex" />
                </div>
                <div className="w-full mt-5 px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-black">
                  {
                    admins && admins.length > 0 &&
                    admins
                    // .sort((a, b) => a.name.localeCompare(b.name))
                    .map((admin: { name: string, imageURL: string, description: string }, index: number) => (
                      <div
                        key={ index }
                        className="flex flex-col gap-2 w-full items-center bg-white bg-center relative"
                      >
                        <Image
                          width={1000}
                          height={1000}
                          className="h-full w-full border border-white absolute z-10"
                          src={`/images/dd_logo_bg_white.png`}
                          alt={`Imagem de ${admin.name}`}
                        />
                        <div className="flex flex-col w-full h-full p-8 z-20">
                          <Image
                            width={1000}
                            height={1000}
                            className="object-contain w-full bg-black"
                            src={`/images/profile/${admin.imageURL}`}
                            alt={`Imagem de ${admin.name}`}
                          />
                          <div className="w-full">
                            <p className="text-xl font-bold brookline py-4 pb-2">{ admin.name }</p>
                            <div className="text-sm leading-4">{ admin.description }</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
        }
      </div>
      <Footer />
    </div>
    );
  }