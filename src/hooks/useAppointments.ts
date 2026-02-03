import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';

export interface Appointment {
  id: string;
  patientId?: string; // Adicionado para manter compatibilidade
  patientName: string;
  service: string;
  date: any; // Timestamp ou Date
  status: 'agendado' | 'confirmado' | 'cancelado' | 'concluido';
  duration?: number; // Duração em minutos
  notes?: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Escuta em tempo real (Ótimo para Dashboard)
  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Appointment[];
      setAppointments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const deleteAppointment = async (id: string) => {
    await deleteDoc(doc(db, 'appointments', id));
  };

  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
    await updateDoc(doc(db, 'appointments', id), data);
  };

  // Verifica disponibilidade (Lógica mantida)
  const checkAvailability = async (date: Date): Promise<boolean> => {
    const start = new Date(date);
    start.setSeconds(0, 0);
    const end = new Date(date);
    end.setSeconds(59, 999);

    const q = query(
      collection(db, 'appointments'),
      where('date', '>=', Timestamp.fromDate(start)),
      where('date', '<=', Timestamp.fromDate(end)),
      where('status', '!=', 'cancelado')
    );
    const snapshot = await getDocs(q);
    return snapshot.empty;
  };

  return { appointments, loading, deleteAppointment, updateAppointment, checkAvailability };
};