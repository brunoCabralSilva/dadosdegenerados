'use client'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import firebaseConfig from "./connection";
import { createEventImage } from './storage';
import { IEventRegister, IEventRegisterWithId } from '@/interfaces';

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
