'use client'
import Image from "next/image";
import contexto from "@/context/context";
import Nav from "@/components/nav";
import MessageToUser from "@/components/messageToUser";
import DeleteEvent from "@/components/deleteEvent";
import EditEvent from "@/components/editEvent";
import CreateActivity from "@/components/createActivity";
import Subscribe from "@/components/subscribe";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { authenticate } from "@/firebase/authenticate";
import { getUserByEmail } from "@/firebase/user";
import { getEventsById } from "@/firebase/event";
import { SiGooglemaps } from "react-icons/si";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getActivitiesByEventId } from "@/firebase/activities";
import {
  IActivityRegisterWithId,
  IAuthenticate,
  IDatesToAdd,
  IEventRegisterWithId,
} from "@/interfaces";
import DeleteActivity from "@/components/deleteActivity";
import EditActivity from "@/components/editActivity";
import { getSubscribeByEmailAndEvent } from "@/firebase/subscribes";
import EditSubscribe from "@/components/editSubscribe";
import DeleteSubscribe from "@/components/deleteSubscribe";
import { FaEye } from "react-icons/fa6";
import Subscribeds from "@/components/subscribeds";
import Activity from "@/components/activity";

export default function EventId() {
  const params = useParams();
  const idEvent = params?.id as string;
  const {
    setRouterTo,
    showEditActivity,
    showDeleteActivity,
    userData, setUserData,
    isLatestDateTodayOrFuture,
    showMessage, setShowMessage,
    showSubscribe, setShowSubscribe,
    showEditEvent, setShowEditEvent,
    showDeleteEvent, setShowDeleteEvent,
    showSubscribeds, setShowSubscribeds,
    showEditSubscribe, setShowEditSubscribe,
    showCreateActivity, setShowCreateActivity,
    showDeleteSubscribe, setShowDeleteSubscribe,
  } = useContext(contexto);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [dataEvent, setDataEvent] = useState<IEventRegisterWithId | null>(null);
  const [listActivities, setListActivities] = useState<IActivityRegisterWithId[]>([]);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  
  useEffect(() => {
    setRouterTo(`/events/${idEvent}`);
    const authUser = async () => {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        setEmail(auth.email);
        const getUser = await getUserByEmail(auth.email, setShowMessage);
        if (getUser) setUserData(getUser);
        const isSubscribed = await getSubscribeByEmailAndEvent(auth.email, idEvent, setShowMessage);
        if (isSubscribed) setSubscribed(true);
      }
    }
    const getEvent = async () => {
      const event = await getEventsById(idEvent, setShowMessage);
      if (event) {
        setDataEvent(event);
        const allActivities = await getActivitiesByEventId(event.id, setShowMessage);
        setListActivities(allActivities);
      }
    };
    authUser();
    getEvent();
  }, []);
  
  const subscribe = async () => {
    setRouterTo(`/events/${idEvent}`);
    const auth: IAuthenticate | null = await authenticate(setShowMessage);
    if (auth) {
      if (!subscribed) setShowSubscribe({ show: true, id: idEvent, email: email });
      else setShowEditSubscribe(true);
    } else (router.push('/login'))
  };

  return(
    <div className="break-words w-full min-h-screen bg-black">
      { showMessage.show && <MessageToUser /> }
      { showEditEvent.show && <EditEvent dataEvent={ dataEvent } /> }
      { showDeleteEvent.show && <DeleteEvent /> }
      { showCreateActivity.show && <CreateActivity idEvent={ idEvent } /> }
      { showEditActivity.show && <EditActivity /> }
      { showDeleteActivity.show && <DeleteActivity /> }
      { showSubscribe.show && <Subscribe idEvent={ idEvent } /> }
      { showSubscribeds.show && <Subscribeds /> }
      { showEditSubscribe && <EditSubscribe idEvent={ idEvent } email={email} /> }
      { showDeleteSubscribe.show && <DeleteSubscribe /> }
      <Nav />
      <div className="break-words w-full h-full items-center justify-start flex flex-col pb-10 min-h-screen mt-11">
        {
          <div className="break-words w-full flex items-start h-full">
            <div className="break-words w-full h-full">
              <div className="break-words w-full text-white">
                <div className="break-words h-[50vh] bg-[url(/images/dd_logo_bg.jpg)] bg-cover flex items-center justify-center">
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
                  <div className="px-5">
                    <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between w-full">
                      <span className="sm:w-full pr-1 font-bold text-2xl">{ dataEvent.name }</span>
                      {
                        userData.role === 'admin' &&
                        <div className="text-white flex gap-2 justify-end w-full mb-3 sm:mb-0">
                          <button
                            type="button"
                            title="Visualizar Inscritos"
                            onClick={ () => setShowSubscribeds({ show: true, id: idEvent }) }
                            className="text-2xl cursor-pointer mr-1"
                          >
                            <FaEye />
                          </button>
                          {
                            isLatestDateTodayOrFuture(dataEvent) &&
                            <button
                              type="button"
                              onClick={ () => setShowEditEvent({ show: true, id: idEvent }) }
                              className="text-2xl cursor-pointer"
                            >
                              <FiEdit />
                            </button>
                          }
                          <button
                            type="button"
                            onClick={ () => setShowDeleteEvent({ show: true, id: idEvent }) }
                            className="text-2xl cursor-pointer"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      }
                    </div>
                    <a
                      href={dataEvent.linkMaps}
                      target="_blank"
                      className="flex flex-col sm:flex-row items-center gap-2"
                    >
                      <div className="flex sm:hidden w-full items-center gap-2 mt-2 sm:mt-0">
                        <SiGooglemaps className="text-white" />
                        <span className="underline">{ dataEvent.localName }</span>
                      </div>
                      <SiGooglemaps className="text-white hidden sm:flex my-2" />
                      <span className="underline hidden sm:flex my-2">{ dataEvent.localName }</span>
                      <span className="px-1 hidden sm:flex">-</span>
                      <span className="mb-2 sm:mb-0">{ dataEvent.address }</span>
                    </a>
                    <div className="mb-5">
                      { dataEvent.dates.length > 1 ? 'Datas: ' : 'Data: ' } {
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
                  <div className="px-5 text-white flex flex-col sm:flex-row sm:items-center w-full justify-between my-5">
                    <p className="text-xl font-bold">Atividades Programadas</p>
                    {
                      dataEvent &&
                      <div className="flex gap-1">
                        {
                          listActivities && listActivities.length > 0 && isLatestDateTodayOrFuture(dataEvent) &&
                          <button
                          onClick={ subscribe }
                          className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative mt-2 sm:mt-0"
                          >
                            { subscribed ? 'Ver Inscrição' : 'Inscrever-se' }
                          </button>
                        }
                        {
                          subscribed && isLatestDateTodayOrFuture(dataEvent) &&
                          <button
                            onClick={ () => setShowDeleteSubscribe({ show: true, id: idEvent }) }
                            className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative mt-2 sm:mt-0"
                          >
                            Cancelar Inscrição
                          </button>
                        }
                        {
                          userData.role === 'admin' && isLatestDateTodayOrFuture(dataEvent) &&
                          <button
                            onClick={ () => setShowCreateActivity({ show: true, id: idEvent }) }
                            className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative mt-2 sm:mt-0"
                          >
                            Criar Atividade
                          </button>
                        }
                      </div>
                    }
                  </div>
                  <div className="px-5 text-white flex flex-col gap-2">
                    {
                      listActivities
                      && listActivities.length > 0
                      && listActivities
                      .sort((a, b) => {
                        const dateA = new Date(a.dates[0].day).getTime();
                        const dateB = new Date(b.dates[0].day).getTime();
                        if (dateA !== dateB) return dateA - dateB;
                        return a.name.localeCompare(b.name);
                      })
                      .map((activity: IActivityRegisterWithId, index: number) => (
                        <Activity
                          key={ index }
                          dataEvent={ dataEvent }
                          activity={ activity }
                        />
                      ))
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
    );
  }