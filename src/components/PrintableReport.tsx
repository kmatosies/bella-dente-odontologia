import React from 'react';
import { Transaction } from '../types'; // Ajuste o caminho conforme sua estrutura
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PrintableReportProps {
  currentMonth: Date;
  transactions: Transaction[];
  revenue: number;
  expenses: number;
  balance: number;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ 
  currentMonth, 
  transactions, 
  revenue, 
  expenses, 
  balance 
}) => {
  
  // Separa receitas e despesas para tabelas organizadas
  const incomeTransactions = transactions.filter(t => t.type === 'receita');
  const expenseTransactions = transactions.filter(t => t.type === 'despesa');

  return (
    <div className="bg-white text-black w-full max-w-[210mm] mx-auto p-8 hidden print:block">
      
      {/* CABEÇALHO DO RELATÓRIO */}
      <div className="flex justify-between items-end border-b-2 border-gray-800 pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-widest">Relatório Financeiro</h1>
          <p className="text-gray-600 mt-1 font-medium">Bella Dente Odontologia</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl capitalize text-gray-800">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </p>
          <p className="text-sm text-gray-500">Responsável Interno</p>
          <p className="text-xs text-gray-400 mt-1">
            Gerado em: {format(new Date(), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
      </div>

      {/* CARDS DE RESUMO (KPIs) */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Receita Total</p>
          <p className="text-2xl font-bold text-green-700">
            R$ {revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Despesa Total</p>
          <p className="text-2xl font-bold text-red-700">
            R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Saldo Líquido</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-800' : 'text-red-700'}`}>
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* TABELA DE ENTRADAS (PACIENTES) */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-gray-800 border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
          Entradas / Pacientes
        </h3>
        
        {incomeTransactions.length === 0 ? (
           <p className="text-gray-400 italic text-sm py-2">Nenhuma receita registrada neste período.</p>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-bold uppercase text-xs border-b border-gray-200">
                <th className="py-2 px-2 w-24">Data</th>
                <th className="py-2 px-2">Paciente / Descrição</th>
                <th className="py-2 px-2 w-32 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {incomeTransactions.map(t => (
                <tr key={t.id}>
                  <td className="py-2 px-2 text-gray-500 font-mono">
                    {format(parseDate(t.date), 'dd/MM/yyyy')}
                  </td>
                  <td className="py-2 px-2 font-medium text-gray-900">{t.description}</td>
                  <td className="py-2 px-2 text-right font-bold text-green-700">
                    R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* TABELA DE SAÍDAS (DESPESAS) */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-gray-800 border-b border-gray-300 pb-2 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
          Saídas / Despesas
        </h3>
        
        {expenseTransactions.length === 0 ? (
           <p className="text-gray-400 italic text-sm py-2">Nenhuma despesa registrada neste período.</p>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 font-bold uppercase text-xs border-b border-gray-200">
                <th className="py-2 px-2 w-24">Data</th>
                <th className="py-2 px-2">Descrição</th>
                <th className="py-2 px-2 w-32 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenseTransactions.map(t => (
                <tr key={t.id}>
                  <td className="py-2 px-2 text-gray-500 font-mono">
                    {format(parseDate(t.date), 'dd/MM/yyyy')}
                  </td>
                  <td className="py-2 px-2 font-medium text-gray-900">{t.description}</td>
                  <td className="py-2 px-2 text-right font-bold text-red-700">
                    R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* RODAPÉ */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Sistema Bella Dente - Controle Interno
        </p>
      </div>
    </div>
  );
};

// Função auxiliar simples para garantir Data válida
function parseDate(dateInput: any): Date {
  if (typeof dateInput === 'string') return new Date(dateInput);
  if (dateInput?.toDate) return dateInput.toDate();
  return new Date(dateInput);
}

export default PrintableReport;