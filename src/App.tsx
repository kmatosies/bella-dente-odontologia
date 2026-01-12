import { useState } from 'react'
import Login from './pages/Login'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  if (!isAuth) {
    return <Login onLogin={setIsAuth} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-teal-900">Bem-vindo ao Dashboard Bella Dente!</h1>
      <button 
        onClick={() => setIsAuth(false)} 
        className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition"
      >
        Sair
      </button>
    </div>
  )
}

export default App;