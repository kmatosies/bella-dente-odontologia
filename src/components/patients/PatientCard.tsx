import React from 'react';
import { User, Phone, Calendar, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { Patient } from '../../types/index';

interface PatientCardProps {
  patient: Patient;
  darkMode: boolean;
  onClick: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, darkMode, onClick }) => {
  // Cálculo de progresso de pagamento
  const progress = (patient.paidValue / patient.totalValue) * 100;

  return (
    <div 
      onClick={() => onClick(patient)}
      className={`p-5 rounded-3xl border cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01] ${
        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/10 rounded-2xl text-teal-500">
            <User size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{patient.name}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{patient.treatment}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
          patient.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
        }`}>
          {patient.status === 'completed' ? 'Finalizado' : 'Em Curso'}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={16} className="text-teal-500" />
          {patient.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} className="text-teal-500" />
          Última consulta: {new Date(patient.lastVisit).toLocaleDateString('pt-PT')}
        </div>
      </div>

      {/* Barra de Progresso Financeiro */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex justify-between text-xs font-bold mb-2">
          <span className="text-slate-400 uppercase">Pagamento</span>
          <span className="text-teal-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold">
          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
            Recebido: R$ {patient.paidValue.toLocaleString('pt-PT')}
          </span>
          <span className="text-slate-400">
            Total: R$ {patient.totalValue.toLocaleString('pt-PT')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;