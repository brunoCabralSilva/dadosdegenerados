'use client'
import contexto from "@/context/context";
import { getActivitiesByEventId } from "@/firebase/activities";
import { authenticate } from "@/firebase/authenticate";
import { getSubscribeByEmailAndEvent, updateSubscribeByActivityId } from "@/firebase/subscribes";
import { IActivityRegisterWithId, IAuthenticate, IDatesToAdd, ISubscribeWithId } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function EditSubscribe(props: { idEvent: string, email: string }) {
  const { idEvent, email } = props;
  const { setShowMessage, setShowEditSubscribe } = useContext(contexto);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [listActivities, setListActivities] = useState<IActivityRegisterWithId[]>([]);
  const [waitlist, setWaitlist] = useState<IActivityRegisterWithId[]>([]);
  const [activitiesAdded, setActivitiesAdded] = useState<string[]>([]);
  const [waitlistAdded, setWaitlistAdded] = useState<string[]>([]);
  const [whatsappGroup, setWhatsappGroup] = useState<boolean>(false);

  useEffect(() => {
    const getActivities = async () => {
      const getAll = await getActivitiesByEventId(idEvent, setShowMessage);
      
      const listSubs = await getSubscribeByEmailAndEvent(email, idEvent, setShowMessage);
      if (listSubs) {
        setFirstName(listSubs[0].firstName);
        setAge(listSubs[0].age);
        setWhatsapp(listSubs[0].whatsapp);
        setLastName(listSubs[0].lastName);
        setWhatsappGroup(listSubs[0].whatsappGroup);
        const listActivitiesAdded = listSubs.filter((subs: ISubscribeWithId) => subs.waitlist === false).map((subs: ISubscribeWithId) => subs.activityId);
        setActivitiesAdded(listActivitiesAdded);
        const listWaitlistAdded = listSubs.filter((subs: ISubscribeWithId) => subs.waitlist === true).map((subs: ISubscribeWithId) => subs.activityId);
        setWaitlistAdded(listWaitlistAdded);
        setListActivities(getAll.filter((all: IActivityRegisterWithId) => all.availableSpots > 0 || listActivitiesAdded.includes(all.id)));
        setWaitlist(getAll.filter((all: IActivityRegisterWithId) => all.availableSpots <= 0 && !listActivitiesAdded.includes(all.id)));
      }
    }
    getActivities();
  }, []);

  const isValidWhatsappNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 11 || cleaned.length === 10;
  }

  const addOrRemoveActivity = (id: string) => {
    if (activitiesAdded.find((act: string) => act === id)) {
      setActivitiesAdded(activitiesAdded.filter((act: string) => act !== id));
    } else setActivitiesAdded([...activitiesAdded, id]);
  }

  const addOrRemoveWaitList = (id: string) => {
    if (waitlistAdded.find((act: string) => act === id)) {
      setWaitlistAdded(waitlistAdded.filter((act: string) => act !== id));
    } else setWaitlistAdded([...waitlistAdded, id]);
  }

  const verifyActivity = (id: string) => {
    if (activitiesAdded.find((act: string) => act === id)) return true;
    return false;
  }

  const verifyWaitList = (id: string) => {
    if (waitlistAdded.find((act: string) => act === id)) return true;
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
    } else {
      const auth: IAuthenticate | null = await authenticate(setShowMessage);
      if (auth) {
        const updateSubs = await updateSubscribeByActivityId(
          { age, lastName, whatsapp, firstName, email, idEvent, whatsappGroup },
          activitiesAdded,
          waitlistAdded,
          setShowMessage,
        );
        if (updateSubs) window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <div className="break-words z-20 fixed top-0 left-0 w-full flex items-start justify-center bg-[url(/images/dd_logo_bg_black.png)] py-2 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-full lex flex-col justify-center items-center min-h-screen relative border-white border-2 mx-1 pb-5 mt-10">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowEditSubscribe(false)}
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Sua Inscrição para o Evento
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
              <label
                htmlFor="whatsapp-group"
                onClick={ () => setWhatsappGroup(!whatsappGroup) }
                className="break-words mb-4 flex items-center gap-2 w-full cursor-pointer"
              >
                <div
                  id="whatsapp-group"
                  className={`w-6 h-6 border-2 border-white ${whatsappGroup ? 'bg-red-900' : ''}`}
                />
                <p className="break-words w-full text-white">{ whatsappGroup ? 'Desmarque se você não faz parte do grupo do Dados Degenerados (Whatsapp)' : 'Marque se você já faz parte do grupo do Dados Degenerados (Whatsapp)'}</p>
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
                      onClick={ () => addOrRemoveActivity(activities.id) }
                      className={`${verifyActivity(activities.id) ? 'border-red-800 bg-black' : 'border-white' } text-center w-full cursor-pointer border-2 p-4`}
                    >
                      <div className="font-bold">{activities.typeActivity} - { activities.systemSession.name } - { activities.name }</div>
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
                      <div className="text-sm">
                        { verifyActivity(activities.id) ? '(Você está inscrito nesta atividade)' : '' }
                      </div>
                      <div className="text-sm">
                        <span className="pr-1 font-bold">Vagas Disponíveis:</span>
                        <span>{ activities.availableSpots }</span>
                      </div>
                      <div className="text-sm">
                        <span className="pr-1 font-bold">Temas Sensíveis:</span>
                        <span>{ activities.sensibility }</span>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
            <div className="text-white flex flex-col w-full">
              <p className="mb-3">As Atividades abaixo já alcançaram o número máximo de participantes. Clique para marcar ou desmarcar as Atividades que desejar entrar na lista de espera:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 gap-3">
                {
                  waitlist
                  && waitlist.length > 0
                  && waitlist.map((activities: IActivityRegisterWithId, index: number) => (
                    <button
                      type="button"
                      key={index}
                      onClick={ () => addOrRemoveWaitList(activities.id) }
                      className={`${verifyWaitList(activities.id) ? 'border-red-800 bg-black' : 'border-white' } text-center w-full cursor-pointer border-2 p-4`}
                    >
                      <div className="font-bold">{activities.typeActivity} - { activities.systemSession.name } - { activities.name }</div>
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
                      <div className="text-sm">
                        { verifyWaitList(activities.id) ? '(Você está na lista de espera desta atividade)' : '' }
                      </div>
                      <div className="text-sm">
                        <span className="pr-1 font-bold">Vagas Disponíveis:</span>
                        <span>{ activities.availableSpots }</span>
                      </div>
                      <div className="text-sm">
                        <span className="pr-1 font-bold">Temas Sensíveis:</span>
                        <span>{ activities.sensibility }</span>
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
              { loading ? 'Atualizando, aguarde...' : 'Atualizar Inscrição' }
            </button>
          </div>
          {
            loading
            && <div className="break-words text-white flex items-center justify-center flex-col my-5">
              <span className="break-words loader z-50" />
            </div>
          }
        </div>    
      </div>
    </div>
  );
}