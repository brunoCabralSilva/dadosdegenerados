import contexto from "@/context/context";
import { IActivityRegisterWithId, IDatesToAdd, IEventRegisterWithId } from "@/interfaces";
import React, { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Activity(
  props: {
    activity: IActivityRegisterWithId,
    dataEvent: IEventRegisterWithId,
  }) {
  const { activity, dataEvent } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const {
    userData,
    setShowEditActivity,
    setShowDeleteActivity,
    isLatestDateTodayOrFuture,
  } = useContext(contexto);
  if (!showDetails)
    return (
      <button
        type="button"
        title="Expandir"
        onClick={ () => setShowDetails(!showDetails) }
        className="p-4 border cursor-pointer border-white bg-[url(/images/dd_logo_bg_black.png)] bg-center"
      >
        <div className="text-lg sm:text-xl font-bold mb-2 flex flex-col sm:flex-row w-full justify-between items-center">
          <div className="pr-1 flex flex-col sm:flex-row flex-wrap">
            <div className="flex">
              <span className="w-full text-center">{ activity.typeActivity }</span>
              <span className="pl-0 sm:pl-2 hidden sm:flex"> - </span>
            </div>
            <div className="flex pl-0 sm:pl-2">
              <span>{ activity.name }</span>
              <span className="pl-0 sm:pl-2 hidden sm:flex"> - </span>
            </div>
            <div className="pl-0 sm:pl-2">
              { `${activity.dates[0].day.split("-").reverse().join("-") }` }
            </div>
          </div>
          <IoIosArrowDown className="text-2xl" />
        </div>
      </button>
    )
    return(
      <div
        className="p-4 border border-white bg-[url(/images/dd_logo_bg_black.png)] bg-center"
      >
        <div className="text-xl font-bold mb-2 flex flex-col sm:flex-row w-full justify-between items-center">
          <span className="pr-1 text-center sm:text-left">
            { activity.typeActivity } - { activity.name }
          </span>
          <div>
            <div className="text-white flex gap-4 sm:gap-2 justify-end w-full my-3 sm:my-0">
              {
                isLatestDateTodayOrFuture(dataEvent) && userData.role === 'admin' &&
                <button
                type="button"
                onClick={ () => setShowEditActivity({ show: true, data: activity }) }
                  title="Editar"
                  className="text-2xl cursor-pointer"
                >
                  <FiEdit />
                </button>
              }
              {
                userData.role === 'admin' &&
                <button
                  type="button"
                  title="Excluir"
                  onClick={ () => setShowDeleteActivity({ show: true, id: activity.id }) }
                  className="text-2xl cursor-pointer"
                  >
                  <MdDelete />
                </button>
              }
              <button
                type="button"
                title="Minimizar"
                onClick={ () => setShowDetails(!showDetails) }
                className="text-2xl cursor-pointer"
                >
                <IoIosArrowUp />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mb-3 h-0.5 bg-white" />
        <div className="">
          <span className="font-bold">Data: </span>
          {
            activity.dates.map((dateItem: IDatesToAdd, index: number) => (
              <span key={index} className="">
                { `${dateItem.day.split("-").reverse().join("-") }${dateItem.end && dateItem.end !== '' ? ' (das ' : ' (às '}${ dateItem.init.replace(":", "h") + "min" }${dateItem.end && dateItem.end !== '' ? ` às ${ dateItem.end.replace(":", "h") + "min)" }`: ')'} ${activity.dates.length - 1 !== index ? '| ' : ''}`}
              </span>
            ))
          }
        </div>
        {
          activity.dm &&
          <div>
            <span className="font-bold pr-1">
              { `${activity.typeActivity !== 'Sessão de RPG' ? 'Responsável' : 'Narrador(a)'}: ${ activity.dm }` }
            </span>
          </div>
        }
        {
          activity.dm &&
          <div>
            <span className="font-bold pr-1">
              Faixa Etária: +{ activity.recommendedAge && activity.recommendedAge }
            </span>
          </div>
        }
        <div>
          <span className="font-bold pr-1">{
            activity.noSpots ? 'Sem limite de Participantes' : `Quantidade de Participantes: ${activity.spots}`
          }
          </span>
        </div>
        {
          !activity.noSpots &&
          <div>
            <span className="font-bold pr-1">
              Vagas Disponíveis: {activity.availableSpots}
            </span>
          </div>
        }
        {
          activity.typeActivity === 'Sessão de RPG' &&
          <div className="mb-3">
            <span className="font-bold pr-1">Sistema:</span>
            <span>{ activity.systemSession.name }</span>
          </div>
        }
        {
          activity.description !== '' &&
          <div className="">
            <div className="font-bold pr-1">{ activity.typeActivity === 'Sessão de RPG' ? 'Sinopse:' : 'Descrição:' }</div>
            <div className="text-justify whitespace-pre-line">{ activity.description }</div>
          </div>
        }
        <div className="mb-3">
          <div className="font-bold mt-2 pr-1 text-justify">Possíveis temas sensíveis que serão abordados:</div>
          <div className="text-justify">{ activity.sensibility }</div>
        </div>
        {
          activity.typeActivity === 'Sessão de RPG' &&
          <div>
            <div className="font-bold mb-1">Como é jogar { activity.systemSession.name }?</div>
            <div className="mb-3 text-justify">{ activity.systemSession.description }</div>
          </div>
        }
      </div>
    )
  
}