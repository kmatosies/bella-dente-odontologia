// src/pages/Finance.tsx
import React, { useMemo, useState } from "react";
import type { Patient, Transaction } from "../types";
import { transactionsService } from "../services/transactions";
import { TransactionForm } from "../components/Finance/TransactionForm";

type Draft = Omit<Transaction, "id" | "userId">;

type Props = {
  transactions: Transaction[];
  patients: Patient[];
  onDeleteTransaction: (id: string) => Promise<void>;
  darkMode?: boolean;
  userId: string;
};

const Finance: React.FC<Props> = ({ transactions, patients, onDeleteTransaction, darkMode = false, userId }) => {
  const [saving, setSaving] = useState(false);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const handleSave = async (draft: Draft) => {
    setSaving(true);
    try {
      await transactionsService.add({ ...draft, userId });
    } catch (e: any) {
      console.error(e);
      alert(`Erro ao salvar no Firestore: ${e?.message ?? e}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border p-5 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs uppercase text-slate-400 font-bold">Entradas</div>
            <div className="text-2xl font-bold">R$ {totals.income.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400 font-bold">Saídas</div>
            <div className="text-2xl font-bold">R$ {totals.expense.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400 font-bold">Saldo</div>
            <div className="text-2xl font-bold">R$ {totals.balance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <TransactionForm onSave={handleSave} patients={patients} darkMode={darkMode} disabled={saving} />

      <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="p-4 font-bold">Lançamentos</div>
        <div className="divide-y divide-slate-200/10">
          {transactions.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-bold">{t.description}</div>
                <div className="text-sm text-slate-400">
                  {new Date(t.date).toLocaleDateString()} • {t.type}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-bold">R$ {t.amount.toFixed(2)}</div>
                {!!t.id && (
                  <button
                    onClick={() => onDeleteTransaction(t.id!)}
                    className="px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 font-bold"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="p-6 text-slate-400">Nenhuma transação ainda.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;
// Fim src/pages/Finance.tsx