import { useMemo } from 'react';
import { Transaction, TransactionType } from '../types';

export const useTransactions = (transactions: Transaction[]) => {
  return useMemo(() => {
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
};