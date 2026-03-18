import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Stethoscope } from 'lucide-react';

interface LoginProps {
    onLogin: (status: boolean) => void;
}

const DEMO_LOGIN_EMAIL = import.meta.env.VITE_DEMO_LOGIN_EMAIL?.trim();
const DEMO_LOGIN_PASSWORD = import.meta.env.VITE_DEMO_LOGIN_PASSWORD?.trim();

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!DEMO_LOGIN_EMAIL || !DEMO_LOGIN_PASSWORD) {
            setError('Acesso de demonstração não configurado. Defina VITE_DEMO_LOGIN_EMAIL e VITE_DEMO_LOGIN_PASSWORD no .env.local.');
            return;
        }

        if (email === DEMO_LOGIN_EMAIL && password === DEMO_LOGIN_PASSWORD) {
            onLogin(true);
            return;
        }

        setError('E-mail ou senha incorretos.');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-teal-900 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-800 rounded-2xl mb-4 shadow-inner">
                        <Stethoscope className="text-teal-400 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Bella Dente</h1>
                    <p className="text-teal-200 text-sm mt-1">Gestão Odontológica Inteligente</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-900/20 transition-all active:scale-[0.98]"
                        >
                            Entrar no Sistema
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400 text-xs">
                        © 2026 Bella Dente • Praticidade Digital
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
