'use client'
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Image from "next/image";
import Nav from "@/components/nav";
import { IAuthenticate, IDatesToAdd, IEventRegisterWithId } from "@/interfaces";
import MessageToUser from "@/components/messageToUser";
import contexto from "@/context/context";
import { getEventsById } from "@/firebase/event";
import { SiGooglemaps } from "react-icons/si";

export default function Profile() {
  const params = useParams();
  const idEvent = params?.id as string;
  const {
    userData, setUserData,
    showMessage, setShowMessage,
  } = useContext(contexto);
  const [showData, setShowData] = useState<boolean>(false);
  const [dataEvent, setDataEvent] = useState<IEventRegisterWithId | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        if (userData.id === '') {
          const getUser = await getUserByEmail(auth.email, setShowMessage);
          if (getUser) setUserData(getUser);
        }
        setShowData(true);
      }
      else router.push("/");
    };
    const getEvent = async () => {
      const event = await getEventsById(idEvent, setShowMessage);
      if (event) setDataEvent(event);
    };
    authUser();
    getEvent();
  }, []);

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        {
            !showData 
              ? <div className="break-words h-screen flex items-center justify-center bg-dice w-full bg-center">
                  <Loading />               
                </div>
              : <div className="break-words w-full flex items-start h-full">
                  <div className="break-words w-full h-full">
                    <div className="break-words w-full text-white">
                      <div className="break-words h-[35vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex items-center justify-center">
                        <Image
                          width={1000}
                          height={1000}
                          className="object-cover w-2/3 sm:w-1/5"
                          src="/images/dd_logo_completa_sem_fundo_preta.png"
                          alt={`Logo do Dados Degenerados`}
                        />
                      </div>
                    </div>
                    {
                      dataEvent &&
                      <div className="text-white mt-5">
                        <div className="px-5 col-span-2">
                          <div className="flex items-center">
                            <span className="pr-1 font-bold text-2xl">{ dataEvent.name }</span>
                          </div>
                          <a
                              href={dataEvent.linkMaps}
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              <SiGooglemaps className="text-white" />
                              <span className="underline">{ dataEvent.localName }</span>
                            </a>
                          <div className="mb-5">
                            {
                              dataEvent.dates.map((dateItem: IDatesToAdd, index: number) => (
                                <span key={index} className="text-sm font-bold">
                                  { `${dateItem.day.split("-").reverse().join("-") }${dateItem.end && dateItem.end !== '' ? ' (das ' : ' (às '}${ dateItem.init.replace(":", "h") + "min" }${dateItem.end && dateItem.end !== '' ? ` às ${ dateItem.end.replace(":", "h") + "min)" }`: ')'} ${dataEvent.dates.length - 1 !== index ? '| ' : ''}`}
                                </span>
                              ))
                            }
                          </div>
                          <div className="text-justify">
                            { dataEvent.description }
                          </div>                          
                        </div>
                      </div>
                    }
                    <div>
                      Aqui
                    </div>
                  </div>
                </div>
        }
      </div>
      <Footer />
    </div>
    );
  }