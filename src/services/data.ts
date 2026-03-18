import { Patient, Transaction, TransactionType, PaymentMethod } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Paciente Exemplo A',
    email: 'paciente.a@exemplo.local',
    phone: '(00) 00000-0011',
    treatment: 'Implante Dentário',
    status: 'active',
    totalValue: 4500,
    paidValue: 1500,
    lastVisit: '2024-03-15',
    history: ['Avaliação inicial concluída', 'Cirurgia agendada para Abril']
  },
  {
    id: '2',
    name: 'Paciente Exemplo B',
    email: 'paciente.b@exemplo.local',
    phone: '(00) 00000-0012',
    treatment: 'Limpeza e Clareamento',
    status: 'completed',
    totalValue: 800,
    paidValue: 800,
    lastVisit: '2024-03-10',
    history: ['Procedimento finalizado com sucesso']
  },
  {
    id: '3',
    name: 'Paciente Exemplo C',
    email: 'paciente.c@exemplo.local',
    phone: '(00) 00000-0013',
    treatment: 'Aparelho Ortodôntico',
    status: 'active',
    totalValue: 3200,
    paidValue: 600,
    lastVisit: '2024-03-20',
    history: ['Manutenção mensal realizada']
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
      id: 't1',
      type: TransactionType.INCOME,
      category: 'Tratamentos',
      amount: 1500,
      date: '2024-03-20',
      description: 'Entrada Implante - Paciente Exemplo A',
      patientId: '1',
      paymentMethod: PaymentMethod.PIX,
      status: ''
  },
  {
      id: 't2',
      type: TransactionType.EXPENSE,
      category: 'Material',
      amount: 450,
      date: '2024-03-18',
      description: 'Compra de Resinas e Luvas',
      paymentMethod: PaymentMethod.CREDIT_CARD,
      status: ''
  },
  {
      id: 't3',
      type: TransactionType.INCOME,
      category: 'Tratamentos',
      amount: 800,
      date: '2024-03-15',
      description: 'Pagamento Paciente Exemplo B',
      patientId: '2',
      paymentMethod: PaymentMethod.DEBIT_CARD,
      status: ''
  }
];