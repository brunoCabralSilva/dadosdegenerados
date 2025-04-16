import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
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

export async function updateActivityById (dataActivity: IActivityRegisterWithId, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const activityDocRef = doc(db, 'activities', dataActivity.id);
    await runTransaction(db, async (transaction) => {
      const activityDocSnapshot = await transaction.get(activityDocRef);
      if (!activityDocSnapshot.exists()) throw new Error('Atividade não encontrada');
      const existingData = activityDocSnapshot.data();
      const updatedData = { ...existingData, ...dataActivity };
      transaction.update(activityDocRef, updatedData);
    });
    setShowMessage({ show: true, text: 'Atividade atualizada com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar Atividade: ' + error });
    return false;
  }
}

export async function deleteActivitiesByEventId(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, where('eventId', '==', eventId));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(doc(db, 'activities', docSnap.id)));
    await Promise.all(deletePromises);
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir atividades: ' + String(error) });
  }
}

export async function deleteActivityById(
  id: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const activityRef = doc(db, 'activities', id);
    await deleteDoc(activityRef);
    setShowMessage({ show: true, text: 'Atividade excluída com sucesso.' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir atividade: ' + String(error) });
  }
}