import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loading from "./loading";
import contexto from "@/context/context";
import { updateProfileImage } from "@/firebase/storage";
import { updateUserById } from "@/firebase/user";
import { IUserData } from "@/interfaces";

export default function EditProfileImage(props: { setDataUser: React.Dispatch<React.SetStateAction<IUserData>> }) {
  const { setDataUser } = props;
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    setShowEditProfileImage,
    userData, setUserData,
    setShowMessage,
  } = useContext(contexto);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const updateImage = async () => {
    setLoading(true);
    if (profileImage) {
      const updateStorage = await updateProfileImage(userData.id, profileImage, setShowMessage);
      if (updateStorage) {
        const dataUpdated = { ...userData, imageURL: updateStorage };
        await updateUserById(dataUpdated, setShowMessage);
        setUserData(dataUpdated);
        setDataUser(dataUpdated);
        setLoading(false);
      }
    }
    setShowEditProfileImage(false);
  }

  return(
    <div className="break-words z-50 fixed top-0 left-0 w-full flex items-center justify-center bg-black/80 px-3 sm:px-0 overflow-y-auto h-full text-white">
      <div className="break-words w-11/12 sm:w-1/3 lex flex-col justify-center items-center relative bg-black border-white border-2 pb-5 bg-dice">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-white duration-500 transition-colors"
            onClick={() => setShowEditProfileImage(false) }
          />
        </div>
          <div className="flex flex-col w-full items-center px-5 py-5 gap-5">
            <p className="w-full text-center text-white">
              Adicione ou altere a sua imagem de perfil
            </p>
            <img
              className="w-96 h-72 object-cover"
              alt="Imagem de perfil"
              src={ profileImage ? URL.createObjectURL(profileImage) : userData.imageURL }
            />
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImage(e) }
              className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
            />
            {
              loading
              ? <Loading />
              :<button
                onClick={ updateImage }
                className="break-words border-2 border-black hover:border-white transition-colors duration-400 text-white cursor-pointer bg-[url(/images/dd_logo_bg.jpg)] font-bold rounded-lg text-sm px-5 py-2.5 text-center relative w-full"
                >
                  Concluído
              </button>
            }
          </div>
        </div>
    </div>
  );
}