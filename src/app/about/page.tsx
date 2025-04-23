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
                <p className="font-bold text-xl">Quem Somos</p>
              </div>
              <div className="w-full px-3">
                <hr />
              </div>
              <div className="mt-5 px-3">
                <Image
                  width={1000}
                  height={1000}
                  className="float-right object-cover w-1/2 bg-gray-500 ml-3"
                  src={`/images/degenerados0.jpeg`}
                  alt={`Imagem do Grupo reunido`}
                />
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
                <Image
                  width={1000}
                  height={1000}
                  className="float-left object-cover w-1/2 bg-gray-500 mr-4 my-3"
                  src={`/images/degenerados4.jpeg`}
                  alt={`Imagem do Grupo reunido`}
                />
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
                <p className="pt-3">
                  O Crônicas Degeneradas é um evento que reúne narradores e jogadores de RPG para contar histórias que dialoguem com nossa realidade de forma anti-hegemônica, buscando construir narrativas que incentivem a autogestão, a diversidade e o pensamento crítico. Colocamos a imaginação em movimento para pensar e conhecer a nossa realidade, mas também, através da criatividade envolvida nas narrações coletivas que constroem um RPG, conhecer outros mundos, outras possibilidades. Ao interpretar um personagem que tem seu local de fala e autonomia em suas ações, podemos questionar nosso próprio lugar na sociedade, bem como reforçar nossa postura perante suas estruturas opressivas, desenvolvendo uma visão político-social ampla e antiautoritária. RPG é uma forma de literatura, é uma arte, e a arte é essencial para o mundo em tempos sombrios.
                </p>
              </div>
              <div className="px-3 mt-5">
                Conheça alguns dos organizadores:
              </div>
              <div className="w-full mt-5 px-3 flex flex-col gap-3">
                {
                  admins && admins.length > 0 &&
                  admins
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((admin: { name: string, imageURL: string, description: string }, index: number) => (
                    <div
                      key={ index }
                      className="flex gap-2 w-full items-center bg-black/60 bg-center rounded p-4">
                      <Image
                        width={1000}
                        height={1000}
                        className="object-cover rounded-full w-28 h-28 border-2 border-white bg-gray-500 mr-3"
                        src={`/images/profile/${admin.imageURL}`}
                        alt={`Imagem de ${admin.name}`}
                      />
                      <div className="w-full">
                        <p className="text-xl font-bold">{ admin.name }</p>
                        <div className="text-sm">{ admin.description }</div>
                      </div>
                    </div>
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