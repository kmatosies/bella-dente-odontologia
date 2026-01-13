import { Patient, Transaction, TransactionType, PaymentMethod } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    phone: '(11) 98765-4321',
    treatment: 'Implante Dentário',
    status: 'active',
    totalValue: 4500,
    paidValue: 1500,
    lastVisit: '2024-03-15',
    history: ['Avaliação inicial concluída', 'Cirurgia agendada para Abril']
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@email.com',
    phone: '(11) 91234-5678',
    treatment: 'Limpeza e Clareamento',
    status: 'completed',
    totalValue: 800,
    paidValue: 800,
    lastVisit: '2024-03-10',
    history: ['Procedimento finalizado com sucesso']
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 95555-4444',
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
      description: 'Entrada Implante - Maria Oliveira',
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
      description: 'Pagamento João Santos',
      patientId: '2',
      paymentMethod: PaymentMethod.DEBIT_CARD,
      status: ''
  }
];