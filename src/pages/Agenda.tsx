import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppointments, Appointment } from '../hooks/useAppointments';
import AgendaWidget from '../components/AgendaWidget';
import NewAppointmentModal from '../components/NewAppointmentModal';

const Agenda: React.FC = () => {
  const { appointments, loading, deleteAppointment, updateAppointment } = useAppointments();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // --- ESTADOS DO MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const dayAppointments = appointments.filter(app => {
    const appDate = app.date && typeof app.date.toDate === 'function' ? app.date.toDate() : new Date(app.date);
    return isSameDay(appDate, selectedDate);
  });

  const hasAppointment = (day: Date) => {
    return appointments.some(app => {
      const appDate = app.date && typeof app.date.toDate === 'function' ? app.date.toDate() : new Date(app.date);
      return isSameDay(appDate, day) && app.status !== 'cancelado';
    });
  };

  // --- FUNÇÕES DE AÇÃO ---
  const handleOpenNew = () => {
    setEditingAppointment(null); // Garante que não é edição
    setIsModalOpen(true);
  };

  const handleEdit = (app: Appointment) => {
    setEditingAppointment(app); // Define quem será editado
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null); // Limpa ao fechar
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-2rem)] gap-6 animate-in fade-in">
      
      {/* CALENDÁRIO VISUAL (Esquerda) */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><i className="fas fa-chevron-left"></i></button>
            <button onClick={() => setCurrentMonth(new Date())} className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400">Hoje</button>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-slate-400 uppercase py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-1">
          {calendarDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const hasApp = hasAppointment(day);

            return (
              <div 
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative p-2 border rounded-xl cursor-pointer transition-all flex flex-col items-center justify-start h-full
                  border-transparent 
                  ${!isCurrentMonth ? 'text-slate-300 bg-slate-50/50 dark:bg-slate-900/30 dark:text-slate-700' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}
                  ${isSelected ? '!bg-blue-600 !text-white shadow-md transform scale-105 z-10' : ''}
                  ${isToday(day) && !isSelected ? 'bg-blue-50 text-blue-600 font-bold border-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700' : ''}
                `}
              >
                <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>{format(day, 'd')}</span>
                {hasApp && (
                  <div className="flex gap-1 mt-1">
                     <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-400'}`}></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LISTA E BOTÕES (Direita) */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-[#006064] to-[#00838f] p-6 rounded-2xl text-white shadow-lg">
          <p className="opacity-80 text-sm font-medium uppercase tracking-wider mb-1">Agenda para</p>
          <h2 className="text-3xl font-bold capitalize mb-4">
            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h2>
          <button 
            onClick={handleOpenNew}
            className="w-full py-3 bg-white text-[#006064] rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i> Novo Agendamento
          </button>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-96 lg:h-auto">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white">Horários do Dia</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
             <AgendaWidget 
                appointments={dayAppointments} 
                isLoading={loading}
                onDelete={deleteAppointment} 
                onStatusChange={(id, status) => updateAppointment(id, { status })}
                onEdit={handleEdit} // Passa a função de edição
             />
          </div>
        </div>
      </div>

      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialDate={selectedDate} 
        appointmentToEdit={editingAppointment} // Passa o agendamento a ser editado
      />
    </div>
  );
};

export default Agenda;