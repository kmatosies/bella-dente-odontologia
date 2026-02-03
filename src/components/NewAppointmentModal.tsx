import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { Appointment } from '../hooks/useAppointments'; // Importe a interface

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  appointmentToEdit?: Appointment | null; // NOVO: Recebe dados para editar
}

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ 
  isOpen, 
  onClose, 
  initialDate, 
  appointmentToEdit 
}) => {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: '',
    service: '',
    date: '',
    time: '',
    status: 'agendado'
  });

  // Efeito: Quando abre, decide se limpa ou preenche
  useEffect(() => {
    if (isOpen) {
      if (appointmentToEdit) {
        // MODO EDIÇÃO: Preenche com dados existentes
        const appDate = appointmentToEdit.date.toDate ? appointmentToEdit.date.toDate() : new Date(appointmentToEdit.date);
        
        setFormData({
          patientName: appointmentToEdit.patientName,
          service: appointmentToEdit.service,
          date: format(appDate, 'yyyy-MM-dd'),
          time: format(appDate, 'HH:mm'),
          status: appointmentToEdit.status
        });
      } else if (initialDate) {
        // MODO NOVO (via Calendário): Preenche só a data
        setFormData(prev => ({
          ...prev,
          patientName: '',
          service: '',
          date: format(initialDate, 'yyyy-MM-dd'),
          time: '',
          status: 'agendado'
        }));
      } else {
        // MODO NOVO (Botão simples): Limpa tudo
        setFormData({ patientName: '', service: '', date: '', time: '', status: 'agendado' });
      }
    }
  }, [isOpen, initialDate, appointmentToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const combinedDate = new Date(`${formData.date}T${formData.time}`);
      const payload = {
        patientName: formData.patientName,
        service: formData.service,
        date: Timestamp.fromDate(combinedDate),
        status: formData.status
      };
      
      if (appointmentToEdit) {
        // ATUALIZAR EXISTENTE
        const docRef = doc(db, 'appointments', appointmentToEdit.id);
        await updateDoc(docRef, payload);
      } else {
        // CRIAR NOVO
        await addDoc(collection(db, 'appointments'), {
          ...payload,
          createdAt: new Date()
        });
      }

      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao processar agendamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className={`${appointmentToEdit ? 'bg-orange-500' : 'bg-[#006064]'} px-6 py-4 flex justify-between items-center`}>
          <h3 className="text-white font-bold text-lg">
            {appointmentToEdit ? 'Editar Agendamento' : 'Novo Agendamento'}
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#006064] outline-none transition-all"
              value={formData.patientName}
              onChange={e => setFormData({...formData, patientName: e.target.value})}
              placeholder="Nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Procedimento</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#006064] outline-none transition-all"
              value={formData.service}
              onChange={e => setFormData({...formData, service: e.target.value})}
              placeholder="Ex: Limpeza, Canal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input 
                required
                type="date" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#006064] outline-none"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input 
                required
                type="time" 
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#006064] outline-none"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-2 text-white rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 ${appointmentToEdit ? 'bg-orange-500 hover:bg-orange-600' : 'bg-[#006064] hover:bg-teal-900'}`}
            >
              {loading ? 'Salvando...' : (appointmentToEdit ? 'Salvar Alterações' : 'Agendar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentModal;