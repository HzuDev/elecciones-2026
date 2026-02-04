import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../lib/auth-context';
import { Shield, X, Loader2 } from 'lucide-react';
import { getPath } from '../config/site';

function LoginFormContent() {
  const { login, register, loginAsGuest, isLoading } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('El nombre es requerido');
          return;
        }
        const result = await register(email, password, name);
        if (result.success) {
          window.location.href = getPath('/');
        } else {
          setError(result.error || 'Error al registrar cuenta');
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          window.location.href = getPath('/');
        } else {
          setError(result.error || 'Missing account scope. Verifica tu conexión.');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginAsGuest();
      if (result.success) {
        window.location.href = getPath('/');
      } else {
        setError(result.error || 'Error al iniciar sesión de invitado');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div className="bg-[#F1F5F9] min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[700px]">
        
        {/* Left Panel */}
        <div className="lg:col-span-5 grid grid-rows-2 gap-5">
          
          {/* Top Card - Branding */}
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600">Plataforma Segura</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
              Elecciones<br/><span className="text-slate-400">Bolivia 2026</span>
            </h1>
            <p className="text-slate-500 mt-4 text-sm font-medium leading-relaxed">
              Accede al panel de control para la gestión y verificación de datos electorales subnacionales.
            </p>
          </div>

          {/* Bottom Card - Quote */}
          <div className="bg-slate-950 rounded-[3rem] p-10 flex flex-col justify-end relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <p className="text-2xl font-bold text-white leading-tight italic">
                "La democracia se construye con datos."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-slate-950"></div>
                  <div className="w-7 h-7 rounded-full bg-teal-500 border-2 border-slate-950"></div>
                </div>
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Se parte de este proyecto siendo voluntario!</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Shield className="w-[150px] h-[150px]" strokeWidth={0.5} />
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[3rem] p-10 lg:p-16 shadow-xl flex flex-col justify-center relative overflow-hidden">
          
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </h2>
              <p className="text-slate-500 font-medium mt-2">
                {isRegister 
                  ? 'Regístrate para acceder a todas las funciones.' 
                  : 'Ingresa tus credenciales para continuar.'}
              </p>
            </header>

            {/* Error Alert */}
            {error && (
              <div className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-4 transition-all animate-in fade-in slide-in-from-top-2">
                <div className="bg-red-500 p-2 rounded-xl text-white">
                  <X className="w-4 h-4" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Error de Sesión</p>
                  <p className="text-red-800 text-xs font-semibold mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 ml-4">
                    Nombre Completo
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez"
                    disabled={isLoading}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all disabled:opacity-50" 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 ml-4">
                  Correo Electrónico
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all disabled:opacity-50" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 ml-4">
                  Contraseña
                </label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  minLength={8}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all disabled:opacity-50" 
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl mt-4 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    PROCESANDO...
                  </>
                ) : (
                  isRegister ? 'CREAR CUENTA' : 'ACCEDER AL SISTEMA'
                )}
              </button>
            </form>

            <footer className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href={getPath('/')} className="hover:text-blue-600 transition-colors">
                ¿Olvidaste tu clave?
              </a>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError(null);
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  disabled={isLoading}
                  className="text-slate-900 hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  {isRegister ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
                <span className="opacity-20">|</span>
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  Invitado
                </button>
              </div>
            </footer>
          </div>
          
          <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-20 select-none">
            <span className="text-[10px] font-black tracking-tighter">POWERED BY</span>
            <img src="https://appwrite.io/images/logos/logo.svg" alt="Appwrite" className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  return (
    <AuthProvider>
      <LoginFormContent />
    </AuthProvider>
  );
}
