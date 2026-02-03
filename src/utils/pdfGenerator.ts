import { jsPDF } from "jspdf";
import { Transaction, TransactionType } from "../types";

export const generateMonthlyReport = (transactions: Transaction[], selectedDate: Date) => {
  const doc = new jsPDF();
  const monthYear = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  // Filtra transações do mês selecionado
  const monthlyTxs = transactions.filter(t => {
    const d = new Date(t.date + 'T12:00:00');
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const income = monthlyTxs.filter(t => t.type === TransactionType.INCOME && t.status === 'paid').reduce((acc, t) => acc + t.amount, 0);
  const expenses = monthlyTxs.filter(t => t.type === TransactionType.EXPENSE).reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  // Cabeçalho
  doc.setFontSize(22);
  doc.setTextColor(13, 148, 136); // Cor Teal
  doc.text('BELLA DENTE ODONTOLOGIA', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text(`RELATÓRIO FINANCEIRO - ${monthYear}`, 105, 30, { align: 'center' });

  // Resumo Financeiro (Box)
  doc.setDrawColor(200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 40, 170, 50, 5, 5, 'FD');

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Receita Total: R$ ${income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 30, 55);
  doc.text(`Despesas Totais: R$ ${expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 30, 65);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Saldo Líquido: R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 30, 80);

  // Tabela de Transações
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Detalhamento das Transações:', 20, 105);

  let y = 115;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Data', 20, y);
  doc.text('Descrição', 45, y);
  doc.text('Tipo', 140, y);
  doc.text('Valor', 170, y);
  doc.line(20, y+2, 190, y+2);
  y += 10;

  doc.setTextColor(0);
  monthlyTxs.forEach((t) => {
    if (y > 270) { doc.addPage(); y = 20; }
    
    // Formatação da Data
    const txDate = new Date(t.date);
    // Ajuste simples para fuso horário se necessário, ou usar string direta
    const dateStr = txDate.toLocaleDateString('pt-BR');

    doc.text(dateStr, 20, y);
    doc.text(t.description.substring(0, 35), 45, y);
    
    const typeLabel = t.type === 'INCOME' ? 'Entrada' : (t.type === 'EXPENSE' ? 'Saída' : 'Futuro');
    doc.text(typeLabel, 140, y);
    
    doc.text(`R$ ${t.amount.toLocaleString('pt-BR')}`, 170, y);
    y += 7;
  });

  doc.save(`BellaDente_Relatorio_${monthYear.replace(/ /g, '_')}.pdf`);
};