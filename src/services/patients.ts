import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase'; // Ajuste o caminho conforme a estrutura do seu projeto

// Definição do Tipo de Paciente (ajuste conforme seus campos reais)
export interface Patient {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  cpf?: string;
  history?: string;
  createdAt: any;
}

const COLLECTION_NAME = 'patients';

export const patientsService = {
  // Criar novo paciente
  create: async (patient: Omit<Patient, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...patient,
        createdAt: Timestamp.now(),
      });
      return { id: docRef.id, ...patient };
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      throw error;
    }
  },

  // Listar todos os pacientes
  getAll: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Patient[];
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      throw error;
    }
  },

  // Atualizar paciente
  update: async (id: string, data: Partial<Patient>) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      throw error;
    }
  },

  // Deletar paciente
  delete: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
      throw error;
    }
  }
};