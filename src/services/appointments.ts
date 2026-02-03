import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Appointment {
  id?: string;
  patientId: string;
  patientName: string;
  date: any; // Timestamp ou Date
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const COLLECTION_NAME = 'appointments';

export const appointmentsService = {
  create: async (appointment: Omit<Appointment, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), appointment);
    return { id: docRef.id, ...appointment };
  },

  getAll: async () => {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
  },

  // Busca agendamentos de uma data específica (ex: hoje)
  getByDate: async (startDate: Date, endDate: Date) => {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[];
  },

  updateStatus: async (id: string, status: 'scheduled' | 'completed' | 'cancelled') => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status });
  }
};