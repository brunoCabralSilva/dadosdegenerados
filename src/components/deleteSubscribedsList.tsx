import contexto from "@/context/context";
import { IActivityRegisterWithId, ISubscribeWithId } from "@/interfaces";
import { useContext } from "react";
import DeleteAnotherSubscribeds from "./deleteAnotherSubscribe";

export default function DeleteSubscribedsList(props: { list: ISubscribeWithId[], activity: IActivityRegisterWithId }) {
  const { list, activity } = props;
  const { showDeleteAnotherSubscribeds, setShowDeleteAnotherSubscribeds } = useContext(contexto);

  return(
    <div
      className="text-white w-full bg-[url(/images/dd_logo_bg_black.png)] border-2 border-white p-4 mb-3"
    >
      { showDeleteAnotherSubscribeds.show && <DeleteAnotherSubscribeds /> }
      <div className="w-full font-bold mb-3 hidden sm:flex sm:flex-col">
        <div className="mb-3">
          { activity.name } - { activity.typeActivity } - { activity.systemSession.name }
        </div>
        <div className="h-0.5 w-full bg-white mt-2 mb-3" />
        <div className="break-words w-full grid grid-cols-3 text-white font-bold">
          <div>Nome</div>
          <div>Email</div>
          <div></div>
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === false)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="col-span-3 grid grid-cols-3 w-full font-normal"
                key={ index }
              >
                <div className="flex items-center capitalize">
                  { subscribeds.firstName } { subscribeds.lastName }
                </div>
                <div className="flex items-center">
                  { subscribeds.email }
                </div>
                <div className="flex items-center justify-start">
                  <button
                    type="button"
                    onClick={ () => setShowDeleteAnotherSubscribeds({ show: true, data: subscribeds }) }
                    className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-1.5 text-center relative mt-2 sm:mt-0"
                  >
                    Remover Inscrição
                  </button>
                </div>
              </div>
            ))
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <span className="col-span-3 mt-5">
              Lista de Espera
            </span>
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <div className="col-span-3 h-0.5 w-full bg-white mt-2 mb-3" />
          }
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="col-span-3 grid grid-cols-3 w-full font-normal"
                key={ index }
              >
                <div className="flex items-center capitalize">
                  { subscribeds.firstName } { subscribeds.lastName }
                </div>
                <div className="flex items-center">
                  { subscribeds.email }
                </div>
                <div className="flex items-center justify-start">
                  <button
                    type="button"
                    onClick={ () => setShowDeleteAnotherSubscribeds({ show: true, data: subscribeds }) }
                    className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-1.5 text-center relative mt-2 sm:mt-0"
                  >
                    Remover Inscrição
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="sm:hidden w-full font-bold mb-3">
        <div className="mb-3">
          { activity.name } - { activity.typeActivity } - { activity.systemSession.name }
        </div>
        <div className="h-0.5 w-full bg-white mt-2 mb-3" />
        <div className="break-words w-full text-white">
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === false)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="w-full font-normal text-sm mb-3"
                key={ index }
              >
                <div>
                  <span className="font-bold pr-1">Nome:</span>
                  <span className="capitalize">{ subscribeds.firstName } {subscribeds.lastName }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Email:</span>
                  <span>{ subscribeds.email }</span>
                </div>
                <div className="flex items-center justify-start">
                  <button
                    type="button"
                    onClick={ () => setShowDeleteAnotherSubscribeds({ show: true, data: subscribeds }) }
                    className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-1.5 text-center relative mt-2 sm:mt-0"
                  >
                    Remover Inscrição
                  </button>
                </div>
              </div>
            ))
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <span className="col-span-6 mt-5">
              Lista de Espera
            </span>
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <div className="col-span-6 h-0.5 w-full bg-white mt-2 mb-3" />
          }
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="w-full font-normal text-sm mb-3"
                key={ index }
              >
                <div>
                  <span className="font-bold pr-1">Nome:</span>
                  <span className="capitalize">{ subscribeds.firstName } {subscribeds.lastName }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Email:</span>
                  <span>{ subscribeds.email }</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}