export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum PaymentMethod {
  PIX = 'pix',
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BOLETO = 'boleto'
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  status: 'active' | 'completed' | 'pending';
  totalValue: number;
  paidValue: number;
  lastVisit: string;
  history?: string[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  description: string;
  patientId?: string;
  paymentMethod: PaymentMethod;
}