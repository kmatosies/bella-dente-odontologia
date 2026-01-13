import React, { useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import PatientCard from '../components/patients/PatientCard';
import { Patient } from '../types/index';

interface PatientsProps {
  patients: Patient[];
  darkMode: boolean;
}

const Patients: React.FC<PatientsProps> = ({ patients, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Procurar paciente ou tratamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-teal-900/20">
          <Plus size={20} />
          Novo Paciente
        </button>
      </div>

      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
              darkMode={darkMode} 
              onClick={(p) => console.log("Paciente selecionado:", p.name)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex p-6 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 mb-4">
            <Users size={48} />
          </div>
          <h3 className="text-xl font-bold">Nenhum paciente encontrado</h3>
          <p className="text-slate-500">Tente ajustar a sua pesquisa.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;