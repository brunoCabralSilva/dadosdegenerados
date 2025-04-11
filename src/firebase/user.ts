'use client'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, where } from 'firebase/firestore';
import firebaseConfig from "./connection";
import { createProfileImage } from './storage';

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  image: File,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) {
  const auth = getAuth(firebaseConfig);
  const db = getFirestore(firebaseConfig);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const imageURL = await createProfileImage(user.uid, image, setShowMessage);
    const collectionRef = collection(db, 'usersData'); 
    await addDoc(collectionRef, {
      email,
      firstName,
      lastName,
      imageURL,
      description: '',
      role: 'common',
    });
    setShowMessage({ show: true, text: 'Usuário registrado com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar usuário: ' + error });
    return false;
  }
}

export async function getUserByEmail(email: string, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const usersCollectionRef = collection(db, 'usersData');
    const q = query(usersCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let user;
    querySnapshot.forEach((doc) => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter usuário por email: ' + error });
    return null;
  }
}

export async function getUserById(userId: string, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const usersCollectionRef = collection(db, 'usersData');
    const userDoc = await getDoc(doc(usersCollectionRef, userId));

    if (!userDoc.exists()) {
      setShowMessage({ show: true, text: 'Usuário com o ID fornecido não encontrado.' });
      return null;
    } else {
      const user = userDoc.data();
      if (user) {
        user.id = userDoc.id;
        return user;
      } else {
        setShowMessage({ show: true, text: 'Usuário encontrado com ID inválido.' });
        return null;
      }
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter usuário por ID: ' + error });
    return null;
  }
}

export async function updateUserById(
  userData: { id: string; firstName?: string; lastName?: string; description?: string },
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  const db = getFirestore(firebaseConfig);
  try {
    const userDocRef = doc(db, 'usersData', userData.id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (!userDocSnapshot.exists()) throw new Error('Usuário não encontrad(a)');
      const existingData = userDocSnapshot.data();
      const updatedData = { ...existingData, ...userData };
      transaction.update(userDocRef, updatedData);
    });
    setShowMessage({ show: true, text: 'Dados atualizados com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar dados: ' + error });
    return false;
  }
}
