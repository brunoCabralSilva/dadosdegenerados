import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { IActivityRegister, IActivityRegisterWithId } from "@/interfaces";

export async function registerActivity(
  dataActivity: IActivityRegister,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'activities');
    await addDoc(collectionRef, {
      eventId: dataActivity.eventId,
      name: dataActivity.name, 
      typeActivity: dataActivity.typeActivity,
      systemSession: dataActivity.systemSession,
      slots: dataActivity.slots,
      noSlots: dataActivity.noSlots,
      dates: dataActivity.dates,
      description: dataActivity.description,
      sensibility: dataActivity.sensibility,
    });
    setShowMessage({ show: true, text: ' Atividade registrada com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar Atividade: ' + error });
    return false;
  }
}

export async function getActivitiesByEventId(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, where('eventId', '==', eventId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return [];
    const activities = querySnapshot.docs.map(doc => (
      {
        id: doc.id,
        ...(doc.data() as Omit<IActivityRegisterWithId, 'id'>)
      }));
    return activities;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter atividades: ' + String(error) });
    return [];
  }
}