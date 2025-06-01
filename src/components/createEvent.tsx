'use client'
import contexto from "@/context/context";
import { registerEvent } from "@/firebase/event";
import { IDatesToAdd } from "@/interfaces";
import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function CreateEvent() {
  const {
    setShowMessage,
    setShowCreateEvent,
  } = useContext(contexto);
  const [prevDay, setPrevDay] = useState<string>('');
  const [prevInit, setPrevInit] = useState<string>('');
  const [prevEnd, setPrevEnd] = useState<string>('');
  const [listDates, setListDates] = useState<IDatesToAdd[]>([]);
  const [nameEvent, setNameEvent] = useState('');
  const [description, setDescription] = useState('');
  const [localName, setLocalName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [linkMaps, setLinkMaps] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);


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
      today.setHours(0, 0, 0, 0);
      const [year, month, day] = prevDay.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  const updateUser = async () => {
    setLoading(true);
    if(!nameEvent && nameEvent.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um Nome para o Evento com mais de 2 caracteres.'});
    } else if(listDates.length === 0) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Data e Horário do Evento.' });
    } else if (!description && description.length < 10) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Descrição para o Evento com pelo menos 10 caracteres.' });
    } else if (!localName && localName.length < 2) {
      setShowMessage({ show: true, text: 'Necessário inserir um nome para o Local do Evento com pelo menos 2 caracteres.' });
    } else if (!address && address.length < 10) {
      setShowMessage({ show: true, text: 'Necessário inserir um Endereço válido para o Endereço do Evento.' });
    } else if (linkMaps.length < 10) {
      setShowMessage({ show: true, text: 'Necessário inserir um link de compartilhamento do maps válido.' });
    } else if (!imageFile) {
      setShowMessage({ show: true, text: 'Necessário inserir uma imagem para o Evento.' });
    } else {
      const createEvnt = await registerEvent({
        name: nameEvent, 
        dates: listDates,
        description,
        localName,
        address,
        imageURL: imageFile,
        linkMaps,
      }, setShowMessage);
       if (createEvnt) {
        window.location.reload();
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
            onClick={() => setShowCreateEvent(false) }
          />
        </div>
        <div className="break-words px-4 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Criação de Evento
            </div>
            <div className="break-words w-full">
              <label htmlFor="nameEvent" className="break-words mb-4 flex flex-col items-center w-full">
                <p className="break-words w-full mb-1 text-white">Nome do Evento *</p>
                <input
                  type="text"
                  id="nameEvent"
                  value={ nameEvent }
                  placeholder="Digite o nome do Evento"
                  className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white outline-none"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEvent(e.target.value) }
                />
              </label>
              <p className="w-full text-white mb-3">
                Datas do Evento (Escolha a Data, horário de Início e Término e depois clique em &quot;Adicionar&quot;. Você pode adicionar quantas datas desejar).
              </p>
              <div className="flex gap-3 mb-5 flex-wrap text-black">
                {
                  listDates.sort((a, b) => {
                    return new Date(a.day).getTime() - new Date(b.day).getTime();
                  })
                  .map((dateItem: IDatesToAdd, index: number) => (
                    <div key={ index } className="text-black bg-white rounded-full px-2 py-2 flex items-center">
                      { `${dateItem.day.split("-").reverse().join("-") }${dateItem.end && dateItem.end !== '' ? ', das ' : ', às '}${ dateItem.init.replace(":", "h") + "min" }${dateItem.end && dateItem.end !== '' ? ` às ${ dateItem.end.replace(":", "h") + "min" }`: ''}`}
                      <MdDelete
                        onClick={ () => deleteDate(dateItem) }
                        className="ml-2 cursor-pointer text-black"
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
              <p className="break-words w-full mb-3 text-white">Descrição do Evento *</p>
              <textarea
                id="description"
                rows={7}
                value={ description }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Digite um texto descritivo para o Evento"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDescription(e.target.value) }
              />
            </label>
            <label htmlFor="local" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Local do Evento *</p>
              <input
                id="local"
                value={ localName }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Digite o nome do estabelecimento do Evento"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLocalName(e.target.value) }
              />
            </label>
            <label htmlFor="address" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Endereço do Evento *</p>
              <input
                id="address"
                value={ address }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Digite o endereço do Evento"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAddress(e.target.value) }
              />
            </label>
            <label htmlFor="linkMaps" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Insira abaixo o link do maps do Endereço descrito *</p>
              <input
                id="linkMaps"
                value={ linkMaps }
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Link do Google Maps"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLinkMaps(e.target.value) }
              />
            </label>
            <label htmlFor="imageFile" className="break-words mb-5 flex flex-col items-center w-full">
              <p className="break-words w-full mb-3 text-white">Adicione uma Imagem para o evento (1080 x 1350) *</p>
              <input
                type="file"
                id="imageFile"
                className="break-words bg-black border border-white w-full p-3 cursor-pointer text-white text-left sm:text-justify outline-none"
                placeholder="Cole aqui o link do maps"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImage(e) }
              />
            </label>
            <button
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
              onClick={ updateUser }
            >
              { loading ? 'Criando, aguarde...' : 'Criar Evento' }
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