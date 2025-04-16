'use client'
import contexto from "@/context/context";
import { getActivitiesByEventId } from "@/firebase/activities";
import { IActivityRegisterWithId, IDatesToAdd } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Subscribe(props: { idEvent: string }) {
  const { idEvent } = props;
  const { setShowMessage, setShowSubscribe } = useContext(contexto);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [listActivities, setListActivities] = useState<IActivityRegisterWithId[]>([]);
  const [activitiesAdded, setActivitiesAdded] = useState<IActivityRegisterWithId[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const getAll = await getActivitiesByEventId(idEvent, setShowMessage);
      setListActivities(getAll);
    }
    getActivities();
  }, []);

  const isValidWhatsappNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 11 || cleaned.length === 10;
  }

  const addOrRemoveActivity = (activity: IActivityRegisterWithId) => {
    if (activitiesAdded.find((act: IActivityRegisterWithId) => act.name === activity.name)) {
      setActivitiesAdded(activitiesAdded.filter((act: IActivityRegisterWithId) => act.name !== activity.name))
    } else setActivitiesAdded([...activitiesAdded, activity]);
  }

  const verifyActivity = (activity: IActivityRegisterWithId) => {
    if (activitiesAdded.find((act: IActivityRegisterWithId) => act.name === activity.name)) return true;
    return false;
  }
  
  const updateUser = async () => {
    setLoading(true);
    if(!firstName && firstName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Nome com pelo menos 2 caracteres.'});
    } else if (!lastName && lastName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Sobrenome com pelo menos 2 caracteres.' });
    } else if (age === 0) {
      setShowMessage({ show: true, text: 'Necessário inserir uma idade.' });
    } else if (!isValidWhatsappNumber(whatsapp)) {
      setShowMessage({ show: true, text: 'Necessário inserir um número válido (dois números para o DDD e oito/nove números do telefone).' });
    } else if (activitiesAdded.length === 0) {
      setShowMessage({ show: true, text: 'É necessário selecionar pelo menos uma atividade do Evento para participar.' });
    }  else {
      // const createEvnt = await registerEvent({
      //   name: nameEvent,
      //   description,
      //   localName,
      //   address,
      //   linkMaps,
      // }, setShowMessage);
      //  if (createEvnt) {
      //   window.location.reload();
      //  }
    }
    setLoading(false);
  };

  return (
    <div className="break-words z-20 fixed top-0 left-0 w-full flex items-start justify-center bg-[url(/images/dd_logo_bg_black.png)] py-2 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-full lex flex-col justify-center items-center min-h-screen relative border-white border-2 mx-1 pb-5 mt-10">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowSubscribe({ show: false, id: '', email: '' }) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Inscrição para o Evento
            </div>
            <div className="break-words w-full">
              <label htmlFor="firstName" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Nome *</p>
                <input
                  type="text"
                  id="firstName"
                  value={ firstName }
                  placeholder="Digite o seu nome"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value) }
                />
              </label>
              <label htmlFor="lastName" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Sobrenome *</p>
                <input
                  type="text"
                  id="lastName"
                  value={ lastName }
                  placeholder="Digite o seu Sobrenome"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value) }
                />
              </label>
              <label htmlFor="age" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Idade *</p>
                <input
                  type="age"
                  id="age"
                  value={age}
                  placeholder="Digite a sua Idade"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value))}
                />
              </label>
              <label htmlFor="whatsapp" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Whatsapp (DDD + número, ex: 83991234567) *</p>
                <input
                  type="text"
                  id="whatsapp"
                  value={ whatsapp }
                  placeholder="83991234567"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhatsapp((e.target.value)) }
                />
              </label>
            </div>
            <div className="text-white flex flex-col w-full">
              <p className="mb-3">Escolha abaixo as atividades que deseja participar (clique para marcar ou desmarcar):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 gap-3">
                {
                  listActivities
                  && listActivities.length > 0
                  && listActivities.map((activities: IActivityRegisterWithId, index: number) => (
                    <button
                      type="button"
                      key={index}
                      onClick={ () => addOrRemoveActivity(activities) }
                      className={`${verifyActivity(activities) ? 'border-red-800 bg-black' : 'border-white' } text-center w-full cursor-pointer border-2 p-4`}
                    >
                      <div className="font-bold">{activities.typeActivity} - { activities.systemSession.name } - { activities.name }</div>
                      <div className="text-sm">
                        <span className="pr-1 font-bold">Temas Sensíveis:</span>
                        <span>{ activities.sensibility }</span>
                      </div>
                      <div className="  text-sm">
                        <span className="pr-1 font-bold">Data:</span>
                        {
                          activities.dates.map((dateItem: IDatesToAdd, index: number) => (
                            <span key={index} className="">
                              { `${dateItem.day.split("-").reverse().join("-") }${dateItem.end && dateItem.end !== '' ? ' (das ' : ' (às '}${ dateItem.init.replace(":", "h") + "min" }${dateItem.end && dateItem.end !== '' ? ` às ${ dateItem.end.replace(":", "h") + "min)" }`: ')'} ${activities.dates.length - 1 !== index ? '| ' : ''}`}
                            </span>
                          ))
                        }
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
            <button
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
              onClick={ updateUser }
            >
              { loading ? 'Inscrevendo, aguarde...' : 'Inscrever-se' }
            </button>
          </div>
          {
            loading
            && <div className="break-words bg-black/80 text-white flex items-center justify-center flex-col my-5">
              <span className="break-words loader z-50" />
            </div>
          }
        </div>    
      </div>
    </div>
  );
}