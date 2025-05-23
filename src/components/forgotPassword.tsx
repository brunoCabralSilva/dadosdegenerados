'use client'
import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "@/context/context";
import { forgotPassword } from "@/firebase/authenticate";

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(contexto);
  const { setShowForgotPassword, setShowMessage } = context;
  
  const forgotUserPassword = async () => {
		const validate = /\S+@\S+\.\S+/;
    const vEmail = !email || !validate.test(email) || email === '';
    if (vEmail) setShowMessage({ show: true, text: 'Por favor, forneça um e-mail válido.' });
    else { 
			setLoading(true);
      await forgotPassword(email, setShowMessage);
      setShowForgotPassword(false);
      setLoading(false);
    }
  };

  return (
    <div className="break-words z-[80] fixed top-0 left-0 w-full flex items-center justify-center bg-black/80 px-3 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-11/12 md:w-1/2 flex flex-col justify-center items-center relative border-white border-2 pb-5 bg-dice bg-[url(/images/dd_logo_bg_black.png)] bg-cover">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-red-500 duration-500 transition-colors"
            onClick={() => setShowForgotPassword(false) }
          />
        </div>
        <div className="break-words px-6 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2 cursor-pointer">
              Esqueceu a senha?
            </div>
            <label htmlFor="email" className="break-words mb-4 flex flex-col items-center w-full">
              <p className="break-words w-full mb-1 text-white">Digite o seu Email</p>
              <input
                type="email"
                id="email"
                value={ email }
                placeholder="name@company.com"
                className="break-words bg-black border-white border w-full p-3 text-white text-left focus:outline-none"
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) }
              />
            </label>
            <button
              onClick={ forgotUserPassword }
              disabled={loading}
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer w-full bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              >
              <span className="break-words relative px-5 py-2.5 transition-all ease-in duration-75 text-white rounded-md group-hover:bg-opacity-0">
                { loading ? "Enviando..." : "Enviar" }
              </span>
            </button>
          </div>
        </div>    
      </div>
    </div>
  );
}