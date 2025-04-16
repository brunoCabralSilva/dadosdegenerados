import { addDoc, collection, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import firebaseConfig from "./connection";
import { ISystemToAdd } from "@/interfaces";

export async function getAllSystems(setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const eventsCollectionRef = collection(db, 'systems');
    const querySnapshot = await getDocs(eventsCollectionRef);
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ISystemToAdd, 'id'>)
    }));
    return events;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar Sistemas: ' + error });
    return [];
  }
}

export async function registerSystem(name: string, description: string, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'systems');
    await addDoc(collectionRef, { name, description });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar evento: ' + error });
    return false;
  }
}
