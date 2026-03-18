import React, { useState } from 'react';
import { Sparkles, BrainCircuit, AlertCircle } from 'lucide-react';
import { analyzeData } from '../services/geminiService'; 
import { Transaction, } from '../types';
import ReactMarkdown from 'react-markdown';  

interface BellaIAProps {
  transactions: Transaction[];
}

const BellaIA: React.FC<BellaIAProps> = ({ transactions }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Calcula totais para enviar para a IA
      const revenue = transactions
        .filter(t => t.type === 'receita')
        .reduce((acc, t) => acc + t.amount, 0);
        
      const expenses = transactions
        .filter(t => t.type === 'despesa')
        .reduce((acc, t) => acc + t.amount, 0);

      const result = await analyzeData(transactions, revenue, expenses);
      setAnalysis(result);
    } catch (err) {
      setError('A Bella IA está indisponível no momento. Verifique se o servidor proxy está ativo e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Bella Consultora</h1>
            <p className="text-teal-100 mt-1">Sua inteligência artificial para decisões estratégicas.</p>
          </div>
        </div>

        {!analysis && (
          <button 
            onClick={handleGenerateAnalysis}
            disabled={loading}
            className="mt-6 bg-white text-teal-800 px-6 py-3 rounded-lg font-bold hover:bg-teal-50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <BrainCircuit className="animate-spin" /> Analisando dados...
              </>
            ) : (
              'Gerar Análise Estratégica'
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle /> {error}
        </div>
      )}

      {analysis && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 prose prose-teal max-w-none">
          {/* O ReactMarkdown formata o texto da IA bonitinho */}
          <ReactMarkdown>{analysis}</ReactMarkdown>
            
          <button 
            onClick={() => setAnalysis('')}
            className="mt-6 text-sm text-slate-400 hover:text-teal-600 underline"
          >
            Realizar nova análise
          </button>
        </div>
      )}
    </div>
  );
};

export default BellaIA;