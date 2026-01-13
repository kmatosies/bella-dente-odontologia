import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts'; // [cite: 3]

const COLORS = ['#0d9488', '#0891b2', '#0284c7', '#4f46e5', '#7c3aed', '#db2777']; // [cite: 9]

interface ChartsProps {
  categoryData: any[];
  barData: any[];
  darkMode: boolean;
}

const Charts: React.FC<ChartsProps> = ({ categoryData, barData, darkMode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Fluxo de Caixa Acumulado */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <p className="text-xs font-bold text-slate-400 uppercase mb-6 text-center tracking-widest">
          Fluxo de Caixa Acumulado
        </p>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#e2e8f0"} />
              <XAxis dataKey="name" stroke={darkMode ? "#94a3b8" : "#64748b"} fontSize={12} />
              <YAxis stroke={darkMode ? "#94a3b8" : "#64748b"} fontSize={12} />
              <Tooltip 
                cursor={{fill: 'transparent'}} 
                contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px' }} 
              />
              <Bar dataKey="Ganhos" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={40} />
              <Bar dataKey="Gastos" fill="#e11d48" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Receitas por Categoria */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <p className="text-xs font-bold text-slate-400 uppercase mb-6 text-center tracking-widest">
          Receitas por Categoria
        </p>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={categoryData} 
                innerRadius={60} 
                outerRadius={85} 
                paddingAngle={5} 
                dataKey="value"
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize: '11px', paddingTop: '20px'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;