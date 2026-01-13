// src/pages/Dashboard.tsx
import React, { useMemo, useState } from 'react';
import { 
  ArrowUpCircle, ArrowDownCircle, Clock, Wallet, AlertTriangle, 
  TrendingUp, Calendar as CalendarIcon, FileBarChart 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Transaction, Patient, TransactionType } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  patients: Patient[];
  darkMode: boolean;
}

const COLORS = ['#0d9488', '#0891b2', '#0284c7', '#4f46e5', '#7c3aed', '#db2777'];

const Dashboard: React.FC<DashboardProps> = ({ transactions, patients, darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- Lógica de Cálculos (Extraída do original) ---
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME && t.status === 'paid')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => acc + t.amount, 0);
    const receivables = transactions
      .filter(t => t.type === TransactionType.RECEIVABLE || (t.type === TransactionType.INCOME && t.status === 'pending'))
      .reduce((acc, t) => acc + t.amount, 0);
    
    return { income, expenses, receivables, balance: income - expenses };
  }, [transactions]);

  const reminders = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return transactions.filter(t => {
      if (t.status === 'pending') {
        const tDate = new Date(t.date + 'T12:00:00');
        tDate.setHours(0, 0, 0, 0);
        const diffTime = tDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7; // Lembrete de 7 dias
      }
      return false;
    });
  }, [transactions]);

  const categoryChartData = useMemo(() => {
    const categories: Record<string, number> = {};
    transactions.forEach(t => { 
      if (t.type === TransactionType.INCOME && t.status === 'paid') {
        categories[t.category] = (categories[t.category] || 0) + t.amount; 
      }
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const barChartData = useMemo(() => {
    return [{ name: 'Geral', Ganhos: stats.income, Gastos: stats.expenses }];
  }, [stats]);

  // --- Componentes Visuais ---

  const Card = ({ label, value, icon, color }: any) => (
    <div className={`p-5 rounded-2xl shadow-sm border flex items-start gap-4 transition-all hover:scale-[1.02] ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className={`text-xl font-bold text-${color}-600 dark:text-${color}-400`}>
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card label="Entradas Totais" value={stats.income} icon={<ArrowUpCircle className="text-emerald-500" />} color="emerald" />
        <Card label="Saídas Totais" value={stats.expenses} icon={<ArrowDownCircle className="text-rose-500" />} color="rose" />
        <Card label="A Receber" value={stats.receivables} icon={<Clock className="text-amber-500" />} color="amber" />
        <Card label="Saldo em Caixa" value={stats.balance} icon={<Wallet className="text-teal-500" />} color="teal" />
      </div>

      {/* Alertas */}
      {reminders.length > 0 && (
        <div className={`p-6 rounded-3xl border shadow-lg border-l-[12px] ${darkMode ? 'bg-slate-800 border-amber-500/50' : 'bg-amber-50/50 border-amber-400'}`}>
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-bold mb-4">
            <AlertTriangle size={24} />
            <h3 className="text-lg">Pagamentos Próximos (7 dias)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reminders.map(r => (
              <div key={r.id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-amber-100'}`}>
                <p className="text-sm font-bold">{r.description}</p>
                <p className="text-xs text-slate-500">R$ {r.amount.toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráficos */}
      <section className={`p-8 rounded-3xl shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          <TrendingUp className="text-teal-500" /> Análises Financeiras
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Categorias */}
          <div className="h-80">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4 text-center">Receitas por Categoria</p>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryChartData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras - Fluxo */}
          <div className="h-80">
            <p className="text-xs font-bold text-slate-400 uppercase mb-4 text-center">Fluxo de Caixa</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#e2e8f0"} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px' }} />
                <Bar dataKey="Ganhos" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="Gastos" fill="#e11d48" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;