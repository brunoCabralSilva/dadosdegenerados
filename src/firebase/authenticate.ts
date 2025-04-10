import {
  signOut,
  getAuth,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getUserByEmail } from "./user";
import firebaseConfig from "./connection";
import { User } from 'firebase/auth';

interface UserData {
  firstName: string;
  lastName: string;
  imageURL: string;
}

export const signIn = async (email: string, password: string) => {
  const auth = getAuth(firebaseConfig);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const signOutFirebase = async (setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) => {
  try {
    const auth = getAuth(firebaseConfig);
    await signOut(auth);
    setShowMessage({ show: true, text: 'Você foi deslogado da plataforma! Até logo!' });
  } catch (error) {
    setShowMessage({ show: true, text: `Não foi possível deslogar o usuário. Por favor, atualize a página e Tente novamente (${error}).` });
    return false;
  }
};

export const authenticate = async (setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) => {
  try {
    return new Promise<{ email: string, photoURL: string, displayName: string } | null>((resolve) => {
      const auth = getAuth(firebaseConfig);
      const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        if (user && user.email) {
          const dataUser = await getUserByEmail(user.email, setShowMessage) as UserData | null;
          if (dataUser) {
            const displayName = dataUser.firstName + ' ' + dataUser.lastName;
            const photoURL = dataUser.imageURL;
            const { email } = user;
            resolve({ email, displayName, photoURL });
          }
        } else {
          resolve(null);
        } unsubscribe();
      });
    });
  } catch(error) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao autenticar: ' + error });
    return null;
  }
};

export const changeUserPassword = async (
  oldPassword: string,
  email: string,
  newPassword: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) => {
  const auth = getAuth(firebaseConfig);
  try {
    const credenciais = signInWithEmailAndPassword(auth, email, oldPassword);
    await credenciais;
    const user: User | null = auth.currentUser;
    if (user) await updatePassword(user, newPassword);
    setShowMessage({ show: true, text: 'Senha alterada com sucesso!' });
    return true
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao alterar a senha: (' + error + ')' });
    return false;
  }
};

export const forgotPassword = async (email: string, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) => {
  const auth = getAuth(firebaseConfig);
  try {
    await sendPasswordResetEmail(auth, email);
    setShowMessage({ show: true, text: 'Enviamos um link de confirmação para seu Email. Por meio dele, você poderá redefinir sua Senha!' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao enviar e-mail de redefinição de senha: ' + error + ')' });
    return false;
  }
};