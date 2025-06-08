import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, runTransaction, updateDoc, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { IActivityRegister, IActivityRegisterWithId } from "@/interfaces";
import { deleteSubscribesByActivityId } from "./subscribes";

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
      dm: dataActivity.dm,
      typeActivity: dataActivity.typeActivity,
      systemSession: dataActivity.systemSession,
      spots: dataActivity.spots,
      recommendedAge: dataActivity.recommendedAge,
      noSpots: dataActivity.noSpots,
      availableSpots: dataActivity.availableSpots,
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

export async function updateAvaiableSpots(
  idEvent: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const activitiesRef = collection(db, 'activities');
    const activitiesQuery = query(activitiesRef, where('eventId', '==', idEvent));
    const activitiesSnapshot = await getDocs(activitiesQuery);
    const updatePromises = activitiesSnapshot.docs.map(async (activityDoc) => {
      const activityId = activityDoc.id;
      const activityData = activityDoc.data();
      const totalSpots = activityData.spots;
      const subscribesRef = collection(db, 'subscribes');
      const subscribesQuery = query(subscribesRef, where('activityId', '==', activityId), where('waitlist', '==', false));
      const subscribesSnapshot = await getDocs(subscribesQuery);
      const count = subscribesSnapshot.size;
      const availableSpots = Math.max(totalSpots - count, 0);
      const activityRef = doc(db, 'activities', activityId);
      await updateDoc(activityRef, { availableSpots });
    });
    await Promise.all(updatePromises);
    setShowMessage({ show: true, text: 'Vagas disponíveis atualizadas com sucesso.' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar vagas disponíveis: ' + String(error) });
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
    await deleteSubscribesByActivityId(id, setShowMessage);
    setShowMessage({ show: true, text: 'Atividade excluída com sucesso.' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir atividade: ' + String(error) });
  }
}