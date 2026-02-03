// src/components/SecurityModal.tsx
import React from 'react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Senha atualizada com sucesso! (Simulação)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-200 border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800'}`}>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-cog text-[#006064]"></i>
            Configurações de Acesso
          </h3>
          <button onClick={onClose} className={`w-8 h-8 flex items-center justify-center rounded-full transition ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase opacity-50 mb-1 block">Senha Atual</label>
            <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-slate-400"></i>
                <input 
                type="password" 
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006064] ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} 
                placeholder="••••••••"
                />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase opacity-50 mb-1 block">Nova Senha</label>
            <div className="relative">
                <i className="fas fa-key absolute left-3 top-3 text-slate-400"></i>
                <input 
                type="password" 
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006064] ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} 
                placeholder="••••••••"
                />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full bg-[#006064] hover:bg-[#00838f] text-white font-bold py-3.5 rounded-xl shadow-lg transition active:scale-95">
                Atualizar Senha
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};