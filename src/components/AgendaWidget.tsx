import React from 'react';
import { Appointment } from '../hooks/useAppointments'; 

interface AgendaWidgetProps {
  appointments: Appointment[];
  isLoading: boolean;
  // ADICIONANDO AS NOVAS PROPS AQUI:
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: any) => void;
  onEdit: (appointment: Appointment) => void;
}

const AgendaWidget: React.FC<AgendaWidgetProps> = ({ 
  appointments, 
  isLoading, 
  onDelete, 
  onStatusChange, 
  onEdit 
}) => {

  const formatDate = (dateInput: any) => {
    if (!dateInput) return '';
    const date = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-200';
      case 'agendado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelado': return 'bg-red-100 text-red-800 border-red-200';
      case 'concluido': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {isLoading ? (
        <div className="animate-pulse space-y-4 p-4">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p>Nenhuma consulta para este dia.</p>
        </div>
      ) : (
        <div className="space-y-3 p-2">
          {appointments.map((app) => (
            <div key={app.id} className="group bg-white border border-gray-100 hover:border-blue-300 rounded-xl p-3 transition-all hover:shadow-md flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg w-12 h-12 font-bold text-sm">
                  {formatDate(app.date)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{app.patientName}</h4>
                  <p className="text-xs text-gray-500">{app.service}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={() => onStatusChange(app.id, app.status === 'confirmado' ? 'agendado' : 'confirmado')}
                  className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-bold ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </button>
                
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(app)} className="text-gray-400 hover:text-blue-600" title="Editar">
                    <i className="fas fa-pen text-xs"></i>
                  </button>
                  <button onClick={() => {
                     if(window.confirm('Excluir agendamento?')) onDelete(app.id)
                  }} className="text-gray-400 hover:text-red-600" title="Excluir">
                    <i className="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgendaWidget;