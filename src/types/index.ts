// src/types/index.ts

export enum TransactionType { 
  INCOME = 'INCOME', 
  EXPENSE = 'EXPENSE', 
  RECEIVABLE = 'RECEIVABLE' 
}

export enum Category { 
  PROCEDURE = 'PROCEDURE', 
  RENT = 'RENT', 
  SUPPLIES = 'SUPPLIES', 
  OTHER = 'OTHER' 
}

export enum PaymentMethod { 
  PIX = 'PIX', 
  CASH = 'CASH', 
  CREDIT_CARD = 'CREDIT_CARD', 
  DEBIT_CARD = 'DEBIT_CARD', 
  BOLETO = 'BOLETO' 
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatmentHistory: string;
  createdAt: string;
  isFinished: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  paymentMethod: PaymentMethod;
  patientId?: string;
  status: 'paid' | 'pending';
}