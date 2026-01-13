// src/App.tsx
import React, { useState } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import { Transaction, Patient, TransactionType, Category, PaymentMethod } from './types';

// DADOS INICIAIS DO ARQUIVO ORIGINAL 
const INITIAL_PATIENTS: Patient[] = [
  { id: 'p1', name: 'João Silva', phone: '(11) 98888-7777', email: 'joao@email.com', treatmentHistory: 'Tratamento de clareamento concluído.', createdAt: '2023-01-10', isFinished: false },
  { id: 'p2', name: 'Maria Oliveira', phone: '(11) 97777-6666', email: 'maria@email.com', treatmentHistory: 'Planejamento de implantes.', createdAt: '2023-05-15', isFinished: false },
  // ... adicione os outros pacientes do original se quiser
];

const INITIAL_DATA: Transaction[] = [
  { id: '1', date: '2023-10-01', description: 'Limpeza e Clareamento', amount: 450, type: TransactionType.INCOME, category: Category.PROCEDURE, paymentMethod: PaymentMethod.PIX, patientId: 'p1', status: 'paid' },
  { id: '2', date: '2023-10-05', description: 'Aluguel Clínica', amount: 3500, type: TransactionType.EXPENSE, category: Category.RENT, paymentMethod: PaymentMethod.PIX, status: 'paid' },
  { id: '3', date: '2023-10-10', description: 'Implante Dentário', amount: 2500, type: TransactionType.RECEIVABLE, category: Category.PROCEDURE, paymentMethod: PaymentMethod.CREDIT_CARD, patientId: 'p2', status: 'pending' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  // Estados globais de dados
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);

  // Se não estiver logado, mostra a tela de Login que você criou
  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  // Função de logout para passar pro Layout
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
      >
        {activeTab === 'dashboard' && (
          <Dashboard 
            transactions={transactions} 
            patients={patients}
            darkMode={darkMode}
          />
        )}
        
        {activeTab === 'patients' && (
          <div className="p-4 text-center text-slate-500">
            {/* Aqui virá o componente Patients.tsx futuramente */}
            <h2 className="text-xl font-bold">Módulo de Pacientes</h2>
            <p>Implementação na próxima etapa...</p>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="p-4 text-center text-slate-500">
             {/* Aqui virá o componente Financeiro futuramente */}
            <h2 className="text-xl font-bold">Módulo Financeiro</h2>
            <p>Implementação na próxima etapa...</p>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default App;