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

export async function createPubliImage (id: string, img: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>){
  try {
    const storage = getStorage(firebaseConfig);
    const storageRef = ref(storage, `images/blog/${id}/${img.name}`);
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao fazer upload da midia imagem: " + error });
    return false;
  }
};

export async function updateBlogImage(blogId: string, newImage: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  const storage = getStorage(firebaseConfig);
  const folderRef = ref(storage, `images/blog/${blogId}`);
  try {
    const folderContents = await listAll(folderRef);
    for (const itemRef of folderContents.items) {
      await deleteObject(itemRef);
    }
    const newImageRef = ref(storage, `images/blog/${blogId}/${newImage.name}`);
    await uploadBytes(newImageRef, newImage);
    const newImageUrl = await getDownloadURL(newImageRef);
    return newImageUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao atualizar imagem: " + error });
    return null;
  }
}

export async function updateEventImage(eventId: string, newImage: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  const storage = getStorage(firebaseConfig);
  const folderRef = ref(storage, `images/events/${eventId}`);
  try {
    const folderContents = await listAll(folderRef);
    for (const itemRef of folderContents.items) {
      await deleteObject(itemRef);
    }
    const newImageRef = ref(storage, `images/events/${eventId}/${newImage.name}`);
    await uploadBytes(newImageRef, newImage);
    const newImageUrl = await getDownloadURL(newImageRef);
    return newImageUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao atualizar imagem: " + error });
    return null;
  }
}

export async function deleteEventImage(
  id: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const storage = getStorage(firebaseConfig);
    const folderRef = ref(storage, `images/events/${id}/`);
    const listResult = await listAll(folderRef);
    const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
    setShowMessage({ show: true, text: 'Imagens do evento excluídas com sucesso.' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir imagens do evento: ' + error });
    return false;
  }
}

export async function deleteBlogImage(
  id: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const storage = getStorage(firebaseConfig);
    const folderRef = ref(storage, `images/blog/${id}/`);
    const listResult = await listAll(folderRef);
    const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
    setShowMessage({ show: true, text: 'Imagens da Publicação excluídas com sucesso.' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir imagens da Publicação: ' + error });
    return false;
  }
}

export async function createActivityImage (id: string, img: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>){
  try {
    const storage = getStorage(firebaseConfig);
    const storageRef = ref(storage, `images/activities/${id}/${img.name}`);
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao fazer upload da midia imagem: " + error });
    return false;
  }
};

export async function updateActivityImage(activityId: string, newImage: File, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  const storage = getStorage(firebaseConfig);
  const folderRef = ref(storage, `images/activities/${activityId}`);
  try {
    const folderContents = await listAll(folderRef);
    for (const itemRef of folderContents.items) {
      await deleteObject(itemRef);
    }
    const newImageRef = ref(storage, `images/activities/${activityId}/${newImage.name}`);
    await uploadBytes(newImageRef, newImage);
    const newImageUrl = await getDownloadURL(newImageRef);
    return newImageUrl;
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao atualizar imagem: " + error });
    return null;
  }
}

export async function deleteActivityImage(
  id: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const storage = getStorage(firebaseConfig);
    const folderRef = ref(storage, `images/activities/${id}/`);
    const listResult = await listAll(folderRef);
    const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
    setShowMessage({ show: true, text: 'Imagens da Atividade excluídas com sucesso.' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir imagens da Atividade: ' + error });
    return false;
  }
}