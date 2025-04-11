import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import firebaseConfig from "./connection";

export async function createProfileImage (id: string, img: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>){
  try {
    const storage = getStorage(firebaseConfig);
    const storageRef = ref(storage, `images/users/${id}/${img.name}`);
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao fazer upload da midia imagem: " + error });
    return false;
  }
};

export async function createEventImage (id: string, img: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>){
  try {
    const storage = getStorage(firebaseConfig);
    const storageRef = ref(storage, `images/events/${id}/${img.name}`);
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao fazer upload da midia imagem: " + error });
    return false;
  }
};

export async function updateProfileImage(playerId: string, newImage: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  const storage = getStorage(firebaseConfig);
  const folderRef = ref(storage, `images/users/${playerId}`);
  try {
    const folderContents = await listAll(folderRef);
    for (const itemRef of folderContents.items) {
      await deleteObject(itemRef);
    }
    const newImageRef = ref(storage, `images/users/${playerId}/${newImage.name}`);
    await uploadBytes(newImageRef, newImage);
    const newImageUrl = await getDownloadURL(newImageRef);
    return newImageUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao atualizar imagem: " + error });
    return null;
  }
}