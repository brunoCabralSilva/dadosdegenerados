'use client'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, runTransaction, updateDoc } from 'firebase/firestore';
import firebaseConfig from "./connection";
import { createEventImage, deleteEventImage, updateEventImage } from './storage';
import { IEventRegister, IEventRegisterWithId, IEventUpdateWithId } from '@/interfaces';
import { deleteActivitiesByEventId } from './activities';

export async function registerEvent(
  dataEvent: IEventRegister,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) {
  const db = getFirestore(firebaseConfig);
  try {
    const collectionRef = collection(db, 'events');
    const newEventRef = await addDoc(collectionRef, {
      name: dataEvent.name, 
      dates: dataEvent.dates,
      description: dataEvent.description,
      localName: dataEvent.localName,
      address: dataEvent.address,
      imageURL: null,
      linkMaps: dataEvent.linkMaps,
    });
    const imageURL = await createEventImage(newEventRef.id, dataEvent.imageURL, setShowMessage);
    if (imageURL) {
      await updateDoc(newEventRef, { imageURL });
      setShowMessage({ show: true, text: 'Evento registrado com sucesso!' });
    }
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar evento: ' + error });
    return false;
  }
}

export async function getAllEvents(setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const eventsCollectionRef = collection(db, 'events');
    const querySnapshot = await getDocs(eventsCollectionRef);
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<IEventRegisterWithId, 'id'>)
    }));
    return events;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar eventos: ' + error });
    return [];
  }
}

export async function getEventsById(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<IEventRegisterWithId | null> {
  try {
    const db = getFirestore(firebaseConfig);
    const eventsCollectionRef = collection(db, 'events');
    const eventDoc = await getDoc(doc(eventsCollectionRef, eventId));
    if (!eventDoc.exists()) {
      setShowMessage({ show: true, text: 'Evento com o ID fornecido não encontrado.' });
      return null;
    }
    const event = eventDoc.data() as Omit<IEventRegisterWithId, 'id'>;
    return { ...event, id: eventDoc.id };
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter Evento por ID: ' + error });
    return null;
  }
}

export async function updateEventById(dataEvent: IEventUpdateWithId, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>> ) {
  const db = getFirestore(firebaseConfig);
  try {
    if (typeof dataEvent.imageURL === 'object') {
      const updtImage = await updateEventImage(dataEvent.id, dataEvent.imageURL, setShowMessage);
      if (updtImage) dataEvent.imageURL = updtImage;
    }
    const userDocRef = doc(db, 'events', dataEvent.id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (!userDocSnapshot.exists()) throw new Error('Evento não encontrad(a)');
      const existingData = userDocSnapshot.data();
      const updatedData = { ...existingData, ...dataEvent };
      transaction.update(userDocRef, updatedData);
    });
    setShowMessage({ show: true, text: 'Evento atualizados com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar Evento: ' + error });
    return false;
  }
}

export async function deleteEventById(
  eventId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const eventRef = doc(collection(db, 'events'), eventId);
    const deleteImage = await deleteEventImage(eventId, setShowMessage);
    if (deleteImage) {
      await deleteDoc(eventRef);
      await deleteActivitiesByEventId(eventId, setShowMessage);
      setShowMessage({ show: true, text: 'Evento excluído com sucesso.' });
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir o evento: ' + error });
  }
}
