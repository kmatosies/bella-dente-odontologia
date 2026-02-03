// src/components/finance/TransactionForm.tsx
import React, { useState } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import type { Patient } from "../../types";
import type { Transaction } from "../../services/transactions";

type Draft = Omit<Transaction, "id" | "userId">;

interface Props {
  onSave: (transaction: Draft) => void;
  patients: Patient[];
  darkMode: boolean;
  disabled?: boolean;
}

export const TransactionForm: React.FC<Props> = ({ onSave, patients, darkMode, disabled }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [patientId, setPatientId] = useState("");

  const handleSubmit = () => {
    if (!description.trim() || !amount) {
      alert("Preencha descrição e valor.");
      return;
    }

    onSave({
      description: description.trim(),
      amount: Number(amount),
      type,
      date,
      patientId: patientId || undefined,
      status: "paid",
      category: "other",
      paymentMethod: "pix",
    });

    setDescription("");
    setAmount("");
    setPatientId("");
  };

  return (
    <div className={`p-8 rounded-3xl shadow-sm border transition-colors ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Plus size={20} className="text-teal-500" /> Registrar Movimentação
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Data</label>
          <div className={`relative flex items-center rounded-xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
            <CalendarIcon size={16} className="absolute left-4 text-teal-500" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none rounded-xl font-bold text-sm"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Descrição</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
            placeholder="Ex: Limpeza, Ortodontia..."
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
          >
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Vinculado ao Paciente</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}
          >
            <option value="">Venda Direta / Avulso</option>
            {patients.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end lg:col-span-4">
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="w-full bg-teal-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-transform hover:bg-teal-700"
          >
            {disabled ? "Salvando..." : "Confirmar Lançamento"}
          </button>
        </div>
      </div>
    </div>
  );
};
// Fim src/components/finance/TransactionForm.tsx