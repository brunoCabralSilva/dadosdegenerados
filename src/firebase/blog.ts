'use client'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, runTransaction, updateDoc } from 'firebase/firestore';
import firebaseConfig from "./connection";
import { createPubliImage, deleteBlogImage, updateBlogImage } from './storage';
import { IBlog, IBlogUpdateWithId, IBlogWithId } from '@/interfaces';
import { getOfficialTimeBrazil } from './utilities';

export async function registerBlog(
  data: IBlog,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>,
) {
  const db = getFirestore(firebaseConfig);
  try {
    const date = await getOfficialTimeBrazil();
    const collectionRef = collection(db, 'blog');
    const newblogRef = await addDoc(collectionRef, {
      date,
      imageURL: null,
      text: data.text,
      title: data.title,
      author: data.author,
    });
    const imageURL = await createPubliImage(newblogRef.id, data.imageURL, setShowMessage);
    if (imageURL) {
      await updateDoc(newblogRef, { imageURL });
      setShowMessage({ show: true, text: 'Publicação registrada com sucesso!' });
    }
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao registrar Publicação: ' + error });
    return false;
  }
}

export async function getAllBlogs(setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>) {
  try {
    const db = getFirestore(firebaseConfig);
    const blogsCollectionRef = collection(db, 'blog');
    const querySnapshot = await getDocs(blogsCollectionRef);
    const blogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<IBlogWithId, 'id'>)
    }));
    return blogs;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao buscar Blogs: ' + error });
    return [];
  }
}

export async function getBlogsById(
  blogId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
): Promise<IBlogWithId | null> {
  try {
    const db = getFirestore(firebaseConfig);
    const blogsCollectionRef = collection(db, 'blog');
    const blogDoc = await getDoc(doc(blogsCollectionRef, blogId));
    if (!blogDoc.exists()) {
      setShowMessage({ show: true, text: 'Publicação com o ID fornecido não encontrada.' });
      return null;
    }
    const blog = blogDoc.data() as Omit<IBlogWithId, 'id'>;
    return { ...blog, id: blogDoc.id };
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter Publicação por ID: ' + error });
    return null;
  }
}

export async function updateBlogById(dataBlog: IBlogUpdateWithId, setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>> ) {
  const db = getFirestore(firebaseConfig);
  try {
    const date: string = await getOfficialTimeBrazil();
    if (typeof dataBlog.imageURL === 'object') {
      const updtImage = await updateBlogImage(dataBlog.id, dataBlog.imageURL, setShowMessage);
      if (updtImage) dataBlog.imageURL = updtImage;
    }
    const userDocRef = doc(db, 'blog', dataBlog.id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (!userDocSnapshot.exists()) throw new Error('Publicação não encontrada');
      const existingData = userDocSnapshot.data();
      const updatedData = { ...existingData, ...dataBlog, date };
      transaction.update(userDocRef, updatedData);
    });
    setShowMessage({ show: true, text: 'Publicação atualizada com sucesso!' });
    return true;
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao atualizar Publicação: ' + error });
    return false;
  }
}

export async function deleteBlogById(
  blogId: string,
  setShowMessage: React.Dispatch<React.SetStateAction<{ show: boolean; text: string }>>
) {
  try {
    const db = getFirestore(firebaseConfig);
    const blogRef = doc(collection(db, 'blog'), blogId);
    const deleteImage = await deleteBlogImage(blogId, setShowMessage);
    if (deleteImage) {
      await deleteDoc(blogRef);
      setShowMessage({ show: true, text: 'Publicação excluída com sucesso.' });
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao excluir a Publicação: ' + error });
  }
}
