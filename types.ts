
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  RECEIVABLE = 'RECEIVABLE'
}

export enum Category {
  PROCEDURE = 'Procedimento',
  SUPPLIES = 'Insumos',
  RENT = 'Aluguel/Contas',
  SALARY = 'Salários',
  MARKETING = 'Marketing',
  OTHER = 'Outros'
}

export enum PaymentMethod {
  CASH = 'Dinheiro',
  PIX = 'PIX',
  BOLETO = 'Boleto',
  CREDIT_CARD = 'Cartão de Crédito',
  DEBIT_CARD = 'Cartão de Débito',
  NONE = '-'
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatmentHistory: string; 
  createdAt: string;
  isFinished?: boolean; // Novo campo para separar ativos de finalizados
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
  patientName?: string; 
  status: 'paid' | 'pending';
}

export interface AppConfig {
  reminderDays: number;
}
