import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, runTransaction, updateDoc, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { ISubscribeToAdd, ISubscribeWithId } from "@/interfaces";
import { updateAvaiableSpots } from "./activities";

export async function evaluateOrder(
  activityId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<number> {
  try {
    const db = getFirestore(firebaseConfig);
    const subscribesRef = collection(db, 'subscribes');
    const q = query(subscribesRef, where('activityId', '==', activityId), where('waitlist', '==', true));
    const querySnapshot = await getDocs(q);
    let maxOrder = 0;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (typeof data.order === 'number' && data.order > maxOrder) {
        maxOrder = data.order;
      }
    });
    return maxOrder;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao avaliar ordem: ' + error });
    return 0;
  }
}

export async function registerSubscribe(
  dataSubscribe: ISubscribeToAdd,
  activitiesAdded: string[],
  waitlist: string[],
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'subscribes');
    //activities
    const promisesActivity = activitiesAdded.map(async (act) => {
      const newSubscribe = { ...dataSubscribe, activityId: act, waitlist: false, order: 0 };
      await addDoc(collectionRef, newSubscribe);
    });
    //waitlist
    const promisesWaitlist = waitlist.map(async (act) => {
      const order = await evaluateOrder(act, setShowMessage);
      const newSubscribe = { ...dataSubscribe, activityId: act, waitlist: true, order: order + 1 };
      await addDoc(collectionRef, newSubscribe);
    });
    await Promise.all([...promisesActivity, ...promisesWaitlist]);
    await updateAvaiableSpots(dataSubscribe.idEvent, setShowMessage);
    setShowMessage({ show: true, text: 'Inscrição registradas com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar inscrição: ' + error });
    return false;
  }
}

export async function updateSubscribeByActivityId(
  dataSubscribe: ISubscribeToAdd,
  activitiesAdded: string[],
  waitlist: string[],
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('email', '==', dataSubscribe.email), where('idEvent', '==', dataSubscribe.idEvent));
    const querySnapshot = await getDocs(q);
    const validActivityIds = [...activitiesAdded, ...waitlist];
    const existingActivityIds = new Set<string>();
    const updateOrDeletePromises = querySnapshot.docs.map(async (docSnap) => {
      const sub = docSnap.data();
      const docRef = doc(db, 'subscribes', docSnap.id);
      const currentActivityId = sub.activityId;
      if (validActivityIds.includes(currentActivityId)) {
        const isWaitlist = activitiesAdded.includes(currentActivityId);
        const updatedData = {
          ...dataSubscribe,
          activityId: currentActivityId,
          waitlist: !isWaitlist,
          order: !isWaitlist ? (await evaluateOrder(currentActivityId, setShowMessage) + 1) : 0,
         };
        await updateDoc(docRef, updatedData);
        existingActivityIds.add(currentActivityId);
      } else {
        await deleteDoc(docRef);
      }
    });
    await Promise.all(updateOrDeletePromises);

    const newActivityIds = validActivityIds.filter(id => !existingActivityIds.has(id));
    const createPromises = newActivityIds.map(async (activityId) => {
      const isWaitlist = waitlist.includes(activityId);
      const newData = {
        ...dataSubscribe,
        activityId,
        waitlist: isWaitlist,
        order: isWaitlist ? (await evaluateOrder(activityId, setShowMessage) + 1) : 0,
      };
      await addDoc(collectionRef, newData);
    });
    await Promise.all(createPromises);
    await updateAvaiableSpots(dataSubscribe.idEvent, setShowMessage);
    setShowMessage({ show: true, text: 'Inscrição atualizada com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar inscrição: ' + error });
    return false;
  }
}


export async function updateSubscribeById(dataSubscribe: ISubscribeWithId, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>> ) {
  const db = getFirestore(firebaseConfig);
  try {
    const userDocRef = doc(db, 'subscribes', dataSubscribe.id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (!userDocSnapshot.exists()) throw new Error('Inscrição não encontrada');
      const existingData = userDocSnapshot.data();
      const updatedData = { ...existingData, ...dataSubscribe };
      transaction.update(userDocRef, updatedData);
      await updateAvaiableSpots(dataSubscribe.idEvent, setShowMessage);
    });
    setShowMessage({ show: true, text: 'Inscrição atualizada com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar Inscrição: ' + error });
    return false;
  }
}

export async function getSubscribedsByEventId(idEvent: string, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>): Promise<any | false> {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('idEvent', '==', idEvent));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    setShowMessage({show: true, text: 'Erro ao buscar inscrição: ' + error });
    return false;
  }
}

export async function getSubscribedsByActivity(
  activityId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<any[] | false> {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('activitiesAdded', 'array-contains', activityId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    const subscribes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return subscribes;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar inscrição: ' + error });
    return false;
  }
}

export async function getSubscribedsByEvent(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<any[] | false> {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('idEvent', '==' , eventId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    const subscribes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return subscribes;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar Inscrições pelo Evento: ' + error });
    return false;
  }
}

export async function getSubscribeByEmailAndEvent(
  email: string,
  idEvent: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<ISubscribeWithId[] | false> {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('email', '==', email), where('idEvent', '==', idEvent));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const subscribes: ISubscribeWithId[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ISubscribeWithId[];
      return subscribes;
    }
    return false;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar inscrições: ' + error });
    return false;
  }
}

export async function deleteSubscribeById(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'subscribes');
    const q = query(collectionRef, where('idEvent', '==', eventId));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, 'subscribes', docSnapshot.id))
    );
    await Promise.all(deletePromises);
    await updateAvaiableSpots(eventId, setShowMessage);
    setShowMessage({ show: true, text: 'A Inscrição foi cancelada.' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao cancelar Inscrição: ' + error });
  }
}

export async function deleteSubscribesByActivityId(
  activityId: string,
  setShowMessage?: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);

    const subscribesRef = collection(db, 'subscribes');
    const q = query(subscribesRef, where('activitiesAdded', 'array-contains', activityId));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'subscribes', docSnap.id))
    );

    await Promise.all(deletePromises);

    if (setShowMessage) {
      setShowMessage({ show: true, text: 'Subscrições relacionadas foram excluídas com sucesso.' });
    }
  } catch (error) {
    if (setShowMessage) {
      setShowMessage({ show: true, text: 'Erro ao excluir subscrições: ' + String(error) });
    } else {
      console.error('Erro ao excluir subscrições:', error);
    }
  }
}