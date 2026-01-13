import React from 'react';
import { 
  LayoutDashboard, Users, Wallet, LogOut, Stethoscope, 
  Moon, Sun, Bell, Menu, X 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeTab, setActiveTab, darkMode, setDarkMode, onLogout 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'finance', label: 'Financeiro', icon: Wallet },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        ${darkMode ? 'bg-teal-950 border-slate-800' : 'bg-teal-900 border-teal-800'} border-r`}>
        
        <div className="p-6 flex items-center gap-3">
          <div className="bg-teal-500 p-2 rounded-lg text-white">
            <Stethoscope size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl text-white">Bella Dente</span>}
        </div>

        <nav className="mt-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${activeTab === item.id 
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                  : 'text-teal-100 hover:bg-teal-800'}`}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="absolute bottom-8 left-3 right-3 flex items-center gap-3 p-3 text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
        >
          <LogOut size={22} />
          {isSidebarOpen && <span className="font-medium">Sair do Sistema</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        {/* Header Superior */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Bem-vindo de volta</h2>
            <p className="text-2xl font-bold">Dr. Edi Belarmino</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl border ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            <div className={`p-3 rounded-xl border ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
              <Bell size={20} className="text-slate-400" />
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;