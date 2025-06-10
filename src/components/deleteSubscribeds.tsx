'use client'
import contexto from "@/context/context";
import { getActivitiesByEventId } from "@/firebase/activities";
import { getSubscribedsByEvent } from "@/firebase/subscribes";
import { IActivityRegisterWithId, ISubscribeWithId } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DeleteSubscribedsList from "./deleteSubscribedsList";

export default function DeleteSubscribeds() {
  const { setShowMessage, showDeleteSubscribeds, setShowDeleteSubscribeds } = useContext(contexto);
  const [listSubscribeds, setListSubscribeds] = useState<ISubscribeWithId[]>([]);
  const [listActivities, setListActivities] = useState<IActivityRegisterWithId[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const getSubs = await getSubscribedsByEvent(showDeleteSubscribeds.id, setShowMessage);
      if (getSubs) setListSubscribeds(getSubs);
      const allActivities = await getActivitiesByEventId(showDeleteSubscribeds.id, setShowMessage);
      setListActivities(allActivities);
    }
    getActivities();
  }, []);

  return (
    <div className="break-words z-20 fixed top-0 left-0 w-full flex items-start justify-center bg-black py-2 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-full lex flex-col justify-center items-center min-h-screen relative border-white border-2 mx-1 pb-5 mt-10">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowDeleteSubscribeds({ show: false, id: '' }) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Remover Inscritos(s)
            </div>
            {
              listActivities &&
              listActivities.length > 0 &&
              listActivities.map((activity: IActivityRegisterWithId, index: number) => (
                <DeleteSubscribedsList
                  key={ index }
                  list={ listSubscribeds }
                  activity={ activity }
                />
              ))
            }
          </div>
        </div>    
      </div>
    </div>
  );
}