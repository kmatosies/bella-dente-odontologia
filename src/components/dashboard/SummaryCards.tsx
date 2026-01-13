import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Clock, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  stats: {
    income: number;
    expenses: number;
    receivables: number;
    balance: number;
  };
  darkMode: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats, darkMode }) => {
  const cardClass = `p-5 rounded-2xl shadow-sm border flex items-start gap-4 transition-all hover:scale-[1.02] ${
    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'
  }`;

  const cards = [
    { label: "Entradas Totais", value: stats.income, icon: <ArrowUpCircle className="text-emerald-500" /> },
    { label: "Saídas Totais", value: stats.expenses, icon: <ArrowDownCircle className="text-rose-500" /> },
    { label: "A Receber", value: stats.receivables, icon: <Clock className="text-amber-500" /> },
    { label: "Saldo em Caixa", value: stats.balance, icon: <Wallet className="text-teal-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={cardClass}>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700">{card.icon}</div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
            <p className="text-xl font-bold">R$ {card.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;