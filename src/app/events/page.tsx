'use client'
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Footer from "@/components/footer";
import Image from "next/image";
import contexto from "../../context/context";
import Nav from "@/components/nav";
import CreateEvent from "@/components/createEvent";
import MessageToUser from "@/components/messageToUser";
import { IAuthenticate, IDatesToAdd, IEventRegisterWithId } from "@/interfaces";
import { getAllEvents } from "@/firebase/event";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";

export default function Eventos() {
  const {
    userData, setUserData,
    showCreateEvent, setShowCreateEvent,
    showMessage, setShowMessage,
  } = useContext(contexto);
  const [dataEvents, setDataEvents] = useState<IEventRegisterWithId[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getEvents = async () => {
      const events: IEventRegisterWithId[] | undefined = await getAllEvents(setShowMessage);
      if (events) setDataEvents(events);
    }
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth && userData.id === '') {
        const getUser = await getUserByEmail(auth.email, setShowMessage);
        if (getUser) setUserData(getUser);
      }
    };
    authUser();
    getEvents();
  }, []);

  function getEventDateLabel(dates: IDatesToAdd[]): string | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    for (const dateObj of dates) {
      const eventDate = new Date(dateObj.day);
      eventDate.setHours(0, 0, 0, 0);
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffDays);
      if (diffDays === 0) return "HOJE";
      if (diffDays === 7) return "Em Breve!";
    }
    return '';
  }

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showCreateEvent && <CreateEvent /> }
      { showMessage.show && <MessageToUser /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        <div className="break-words w-full flex items-start h-full">
          <div className="break-words w-full h-full">
            <div className="break-words w-full text-white">
              <div className="break-words h-[35vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex flex-col items-center justify-center">
                <Image
                  width={1000}
                  height={1000}
                  className="object-cover w-2/3 sm:w-1/5"
                  src="/images/dd_logo_completa_sem_fundo_preta.png"
                  alt={`Logo do Dados Degenerados`}
                />
              </div>
              <div>
                <div className="w-full px-3 pt-5 pb-3 flex justify-between items-center">
                  <p className="font-bold text-xl">Eventos</p>
                  {
                    userData.role === 'admin' &&
                    <button
                      onClick={ () => setShowCreateEvent(true) }
                      className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative ease-in group-hover:bg-opacity-0"
                    >
                      Criar Evento
                    </button>
                  }
                </div>
                <div className="w-full px-3">
                  <hr />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {
                    dataEvents && dataEvents.length > 0 && dataEvents.map((itemData: IEventRegisterWithId, index: number) => (
                      <button
                        type="button"
                        onClick={ () => router.push('/events/' + itemData.id) }
                        key={ index }className="mt-5 cursor-pointer relative">
                          {
                            getEventDateLabel(itemData.dates) !== '' &&
                            <div className="absolute right-0 top-0 bg-[url(/images/dd_logo_bg_black.png)] bg-center rounded-b-lg font-bold py-2 px-3 border-2 border-white">
                              { getEventDateLabel(itemData.dates) }
                            </div>
                          }
                          <Image
                            src={itemData.imageURL}
                            alt="Imagem de evento"
                            width={ 1080 }
                            height={ 1350 }
                            className="w-full h-full object-contain"
                          />
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    );
  }