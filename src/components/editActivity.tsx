'use client'
import contexto from "@/context/context";
import { updateActivityById } from "@/firebase/activities";
import { getAllSystems, registerSystem } from "@/firebase/systems";
import { IDatesToAdd, ISystemToAdd } from "@/interfaces";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function EditActivity() {
  const {
    setShowMessage,
    showEditActivity,
    setShowEditActivity,
  } = useContext(contexto);
  const [prevDay, setPrevDay] = useState<string>('');
  const [prevInit, setPrevInit] = useState<string>('');
  const [prevEnd, setPrevEnd] = useState<string>('');
  const [listDates, setListDates] = useState<IDatesToAdd[]>([]);
  const [nameActivity, setNameActivity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sensibility, setSensibility] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [typeActivity, setTypeActivity] = useState<string>('');
  const [systemSession, setSystemSession] = useState<string>('');
  const [spots, setSpots] = useState<number>(0);
  const [noSpots, setNoSpots] = useState<boolean>(false);
  const [showAddSystem, setShowAddSystem] = useState<boolean>(false);
  const [nameNewSystem, setNameNewSystem] = useState<string>('');
  const [descNewSystem, setDescNewSystem] = useState<string>('');
  const [listSystems, setListSystems] = useState<ISystemToAdd[]>([]);
  const [dm, setDm] = useState<string>('');
  const [recommendedAge, setRecommendedAge] = useState<number>(0);

  useEffect(() => {
    if (showEditActivity) {
      setListDates(showEditActivity.data.dates);
      setNameActivity(showEditActivity.data.name);
      setDescription(showEditActivity.data.description);
      setSensibility(showEditActivity.data.sensibility);
      setTypeActivity(showEditActivity.data.typeActivity);
      setSystemSession(showEditActivity.data.systemSession.name);
      setSpots(showEditActivity.data.spots)
      setNoSpots(showEditActivity.data.noSpots);

      if (!showEditActivity.data.recommendedAge) setRecommendedAge(0);
      else setRecommendedAge(showEditActivity.data.recommendedAge);

      if (showEditActivity.data.dm) setDm(showEditActivity.data.dm);
    }
    const getSystems = async () => {
      const getAll = await getAllSystems(setShowMessage);
      setListSystems(getAll);
    }
    getSystems();
  }, []);

  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = String(e.target.value);
    setPrevDay(value);
  }
  
  function handleInitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = String(e.target.value);
    setPrevInit(value);
  }
  
  function handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = String(e.target.value);
    setPrevEnd(value);
  }

  const deleteDate = (dateItem: IDatesToAdd) => {
    setListDates(listDates.filter((dateItem2: IDatesToAdd) =>
      !(dateItem2.day === dateItem.day &&
        dateItem2.init === dateItem.init &&
        dateItem2.end === dateItem.end)
    ));
  }

  const addDate = () => {
    if (!prevDay || prevDay === '') {
      setShowMessage({ show: true, text: "Para adicionar uma Data, Você precisa selecionar um dia." });
    } else if (!prevInit) {
      setShowMessage({ show: true, text: "Você precisa informar o horário de início." });
    } else {
      const today = new Date();
      const selectedDate = new Date(prevDay);
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setShowMessage({ show: true, text: "A data selecionada é anterior à data atual." });
      } else if (prevEnd && prevEnd !== '') {
        const [initHour, initMinute] = prevInit.split(":").map(Number);
        const [endHour, endMinute] = prevEnd.split(":").map(Number);
        const startTime = initHour * 60 + initMinute;
        const endTime = endHour * 60 + endMinute;
        if (endTime <= startTime) {
          setShowMessage({ show: true, text: "O horário de término deve ser depois do horário de início." });
        } else {
          setListDates([...listDates, { day: prevDay, init: prevInit, end: prevEnd }]);
          setPrevDay('');
          setPrevInit('');
          setPrevEnd('');
        }
      } else {
        setListDates([...listDates, { day: prevDay, init: prevInit, end: prevEnd }]);
        setPrevDay('');
        setPrevInit('');
        setPrevEnd('');
      }
    }
  };

  const addSystem = async () => {
    if(!nameNewSystem && nameNewSystem.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Nome para o Sistema com mais de 2 caracteres.'});
    } else if (!descNewSystem && descNewSystem.length < 10) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Descrição para o Sistema com pelo menos 10 caracteres.' });
    } else {
      const register = await registerSystem(nameNewSystem, descNewSystem, setShowMessage);
      if (register) {
        const getAll = await getAllSystems(setShowMessage);
        setListSystems(getAll);
      }
      setShowAddSystem(false);
      setNameNewSystem('');
      setDescNewSystem('');
    }
  }

  const calculateAvaiableSpots = () => {
    if (showEditActivity.data.spots === spots) return showEditActivity.data.availableSpots;
    const subscribeds = showEditActivity.data.spots - showEditActivity.data.availableSpots;
    return spots - subscribeds;
  }
  
  const updateUser = async () => {
    setLoading(true);
    if (nameActivity.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Nome para a atividade com mais de 2 caracteres.'});
    } else if(typeActivity === '') {
      setShowMessage({ show: true, text: 'Necessário Escolher um tipo de Atividade.'});
    } else if(typeActivity === 'Sessão de RPG' && systemSession === '') {
      setShowMessage({ show: true, text: 'Necessário inserir um Sistema para a Sessão.' });
      
    } else if(dm === '') {
      setShowMessage({ show: true, text: `Necessário preencher o nome do ${ typeActivity === 'Sessão de RPG' ? 'Narrador' : 'Responsável'} pela atividade.` });
    } else if(recommendedAge === 0) {
      setShowMessage({ show: true, text: 'Necessário selecionar uma Faixa Etária.' });
    } else if (!noSpots && spots === 0) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Quantidade de Vagas para a Atividade maior que Zero.' });
    } else if(listDates.length === 0) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Data e Horário da Atividade.' });
    } else if (!sensibility && sensibility.length < 10) {
      setShowMessage({ show: true, text: 'Necessário descrever os temas sensíveis para a Atividade com pelo menos 5 caracteres.' });
    } else {
      if (typeActivity === 'Sessão de RPG') {
        const findSystem = listSystems.find((systemData: ISystemToAdd) => systemData.name === systemSession);
        if (findSystem) {
          const updateActvt = await updateActivityById({
            dm,
            spots,
            noSpots,
            description,
            sensibility,
            typeActivity,
            recommendedAge,
            dates: listDates,
            name: nameActivity,
            systemSession: findSystem,
            id: showEditActivity.data.id,
            eventId: showEditActivity.data.eventId,
            availableSpots: calculateAvaiableSpots(),
          }, setShowMessage);
          if (updateActvt) window.location.reload();
        }
      } else {
        const updateActvt = await updateActivityById({
          dm,
          spots,
          noSpots,
          sensibility,
          description,
          typeActivity,
          recommendedAge,
          dates: listDates,
          name: nameActivity,
          availableSpots: spots,
          id: showEditActivity.data.id,
          eventId: showEditActivity.data.eventId,
          systemSession: { name: '', description: ''},
        }, setShowMessage);
        if (updateActvt) window.location.reload();
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
            onClick={() => setShowEditActivity({
              show: false,
              data: {
                id: '',
                eventId: '',
                name: '',
                dm: '',
                recommendedAge: 0,
                typeActivity: '',
                systemSession: { name: '', description: '' },
                spots: 0,
                availableSpots: 0,
                noSpots: false,
                dates: [],
                description: '',
                sensibility: '',
              }
            }) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Edição de Atividade
            </div>
            <div className="break-words w-full">
              <label htmlFor="nameActivity" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Título da Atividade *</p>
                <input
                  type="text"
                  id="nameActivity"
                  value={ nameActivity }
                  placeholder="Digite o nome da Atividade"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameActivity(e.target.value) }
                />
              </label>
              <label htmlFor="typeActivity" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Tipo de Atividade *</p>
                <select
                  id="typeActivity"
                  value={ typeActivity }
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeActivity(e.target.value)}
                >
                  <option disabled value="">Escolha um Tipo de Atividade</option>
                  <option value="Sessão de RPG">Sessão de RPG</option>
                  <option value="Oficina">Oficina</option>
                  <option value="Mesa Redonda">Mesa Redonda</option>
                  <option value="Outra">Outra</option>
                </select>
              </label>
              {
                typeActivity === 'Sessão de RPG' &&
                <label htmlFor="system" className="break-words mb-2 flex flex-col items-center w-full">
                  <p className="w-full break-words mb-1 text-white">Sistema *</p>
                  {
                    !showAddSystem &&
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-2 gap-3">
                      <select
                        id="system"
                        value={ systemSession }
                        className={`break-words bg-black border border-white w-full sm:w-1/2 p-3 cursor-pointer text-white outline-none`}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSystemSession(e.target.value)}
                      >
                        <option disabled value="">Escolha um Sistema</option>
                        {
                          listSystems
                          && listSystems.length > 0
                          && listSystems.map((systemItem: ISystemToAdd, index: number) => (
                            <option
                              key={index}
                              value={systemItem.name}
                            >
                              { systemItem.name }
                            </option>
                          ))
                        }
                      </select>
                      <button
                        onClick={ () => setShowAddSystem(true) }
                        className="border-2 border-black h-full hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] text-center relative py-2 px-4 w-full sm:w-1/2 font-bold"
                      >
                        Clique aqui se Sistema não está na lista 
                      </button>
                    </div>
                  }
                  {
                    showAddSystem &&
                    <div className="border border-white p-4 w-full text-white my-3">
                      <label htmlFor="nameNewSystem" className="break-words mb-4 flex flex-col items-center w-full">
                        <p className="break-words w-full mb-2 text-white">Nome do Sistema (dê preferência para o nome em PT-BR) *</p>
                        <input
                          type="text"
                          id="nameNewSystem"
                          value={ nameNewSystem }
                          placeholder="Digite o nome do Sistema"
                          className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameNewSystem(e.target.value) }
                        />
                      </label>
                      <label htmlFor="descNewSystem" className="break-words my-5 flex flex-col items-center w-full">
                        <p className="break-words w-full mb-3 text-white">Descrição do Sistema *</p>
                        <textarea
                          id="descNewSystem"
                          rows={7}
                          value={ descNewSystem }
                          className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                          placeholder="Descreva o Sistema"
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDescNewSystem(e.target.value) }
                        />
                      </label>
                      <button
                        onClick={ addSystem }
                        className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
                      >
                        Adicionar Sistema
                      </button>
                    </div>
                  }
                </label>
              }
              <label htmlFor="nameNewSystem" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-2 text-white">{ typeActivity !== 'Sessão de RPG' ? 'Responsável' : 'Narrador(a)' }</p>
                <input
                  type="text"
                  id="nameNewSystem"
                  value={ dm }
                  placeholder={`${typeActivity !== 'Sessão de RPG' ? 'Responsável' : 'Narrador(a)'}`}
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDm(e.target.value) }
                />
              </label>
              <label htmlFor="nameNewSystem" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-2 text-white">
                  Faixa Etária *
                </p>
                <select
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  value={ recommendedAge }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRecommendedAge(Number(e.target.value))}
                >
                  <option value={0} disabled>Selecione</option>
                  <option value={12}>+12 </option>
                  <option value={13}>+13 </option>
                  <option value={14}>+14 </option>
                  <option value={15}>+15 </option>
                  <option value={16}>+16 </option>
                  <option value={17}>+17 </option>
                  <option value={18}>+18 </option>
                </select>
              </label>
              <p className="break-words w-full mb-1 text-white">Quantidade de Vagas *</p>
              <label htmlFor="spots" className="break-words mb-4 flex flex-col sm:flex-row items-center w-full gap-3">
                {
                  !noSpots &&
                  <div className="w-full sm:w-1/2">
                    <input
                      id="spots"
                      type="number"
                      value={ spots }
                      className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (Number(e.target.value) >= 0) setSpots(Number(e.target.value));
                      }}
                    />
                  </div>
                }
                <div
                  className={`border-2 border-black h-full hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold text-center relative w-full sm:w-1/2 py-3`}
                  onClick={ () => {
                    setNoSpots(!noSpots);
                    setSpots(0);
                  }}
                >
                  { !noSpots ? 'Clique aqui para definir Vagas Ilimitadas' : 'Clique aqui para definir Vagas Limitadas' }
                </div>
              </label>
              <p className="w-full text-white mb-3">
                Data da Atividade (Escolha a Data, horário de Início e Término e depois clique em &quot;Adicionar&quot;. Você pode adicionar quantas datas desejar).
              </p>
              <div className="flex gap-3 mb-5 flex-wrap">
                {
                  listDates.sort((a, b) => {
                    return new Date(a.day).getTime() - new Date(b.day).getTime();
                  })
                  .map((dateItem: IDatesToAdd, index: number) => (
                    <div key={ index } className="bg-white rounded-full px-2 py-2 flex items-center">
                      { `${dateItem.day.split("-").reverse().join("-") }${dateItem.end && dateItem.end !== '' ? ', das ' : ', às '}${ dateItem.init.replace(":", "h") + "min" }${dateItem.end && dateItem.end !== '' ? ` às ${ dateItem.end.replace(":", "h") + "min" }`: ''}`}
                      <MdDelete
                        onClick={ () => deleteDate(dateItem) }
                        className="ml-2 cursor-pointer"
                      />
                    </div>
                  ))
                }
              </div>
              <div className="sm:grid sm:grid-cols-4 gap-2">
                <p className="hidden sm:flex break-words w-full mb-1 text-white">Dia *</p>
                <p className="hidden sm:flex break-words w-full mb-1 text-white">Início *</p>
                <p className="hidden sm:flex break-words w-full mb-1 text-white">Término</p>
                <div />
                <span className="w-full mb-1 text-white sm:hidden">Dia *</span>
                <label htmlFor="day" className="break-words flex flex-col items-center w-full mb-2 sm:mb-0">
                  <input
                    type="date"
                    id="day"
                    value={prevDay}
                    className="break-words bg-white border border-white p-2.5 cursor-pointer text-black text-center outline-none w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDayChange(e) }
                  />
                </label>
                <span className="w-full mb-1 text-white sm:hidden">Início *</span>
                <label htmlFor="init" className="break-words flex flex-col items-center w-full mb-2 sm:mb-0">
                  <input
                    type="time"
                    id="init"
                    value={prevInit}
                    className="break-words bg-white border border-white p-2.5 cursor-pointer text-black text-center outline-none w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInitChange(e) }
                  />
                </label>
                <span className="w-full mb-1 text-white sm:hidden">Término</span>
                <label htmlFor="end" className="break-words flex flex-col items-center w-full mb-2 sm:mb-0">
                  <input
                    type="time"
                    id="end"
                    value={prevEnd}
                    className="break-words bg-white border border-white p-2.5 cursor-pointer text-black text-center outline-none w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEndChange(e) }
                  />
                </label>
                <button
                  type="button"
                  onClick={ addDate }
                  className="border-2 border-black h-full hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold text-center relative w-full py-3 sm:py-0"
                >
                  Adicionar Data e Horário
                </button>
              </div>
            </div>
            <label htmlFor="description" className="break-words my-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">{`Descrição ${typeActivity !== '' ? `da ${typeActivity}`  : ''}`}</p>
              <textarea
                id="description"
                rows={7}
                value={ description }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Descreva a Atividade"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDescription(e.target.value) }
              />
            </label>
            <label htmlFor="sensibility" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Descreva abaixo os possíveis temas sensíveis que serão abordados *</p>
              <textarea
                id="sensibility"
                rows={7}
                value={ sensibility }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Descreva os temas sensíveis"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSensibility(e.target.value) }
              />
            </label>
            <button
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
              onClick={ updateUser }
            >
              { loading ? 'Atualizando, aguarde...' : 'Atualizar Atividade' }
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