import React, { useState } from 'react';
import { getAllForms } from '../../config/forms';
import { DynamicForm } from './DynamicForm';
import { ArrowLeft, UserPlus, Building2, TrendingUp, MapPin, Plus, Shield, BarChart3 } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { getPath } from '../../config/site';

export function ContributionPage() {
  const { isAuthenticated, isGuest } = useAuth();
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const forms = getAllForms();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Inicia sesión para contribuir</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Necesitas tener una cuenta verificada para agregar datos electorales al sistema
          </p>
          <a
            href={getPath('/login')}
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Ir al Login
          </a>
        </div>
      </div>
    );
  }

  // Show selected form
  if (selectedForm) {
    const form = forms.find((f) => f.id === selectedForm);
    if (!form) {
      setSelectedForm(null);
      return null;
    }

    return (
      <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedForm(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition font-bold text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a módulos
          </button>
          <DynamicForm formConfig={form} onCancel={() => setSelectedForm(null)} />
        </div>
      </div>
    );
  }

  // Main contribution page with bento grid
  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased p-4 md:p-10 min-h-screen pt-24 md:pt-32">
      <main className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 md:mb-10 px-2 md:px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 md:w-8 h-[2px] bg-blue-600"></span>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-600">Módulo de Aportes</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
            Contribuir con <span className="text-slate-400">Datos</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">
            Selecciona el tipo de información que deseas agregar al sistema.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 md:auto-rows-[180px]">

          {/* Main Card - Registrar Candidato */}
          <button 
            onClick={() => setSelectedForm('candidates')}
            className="md:col-span-4 md:row-span-2 bg-slate-950 border-none text-left flex flex-col justify-between shadow-2xl shadow-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative group min-h-[280px] md:min-h-0"
          >
            <div className="z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-blue-600/20">
                <UserPlus className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">Registrar Candidato</h2>
              <p className="text-slate-400 mt-3 md:mt-4 text-xs md:text-sm max-w-sm leading-relaxed">
                Agrega nuevos perfiles electorales, incluyendo biografía y propuestas oficiales para gobernaciones y alcaldías.
              </p>
            </div>
            <div className="z-10 flex items-center gap-2 md:gap-3 text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest group-hover:gap-5 transition-all">
              <span className="hidden sm:inline">Iniciar registro de perfil</span>
              <span className="sm:hidden">Iniciar registro</span>
              <ArrowLeft className="w-4 h-4 rotate-180" strokeWidth={3} />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-colors"></div>
          </button>

          {/* Partido Político */}
          <button 
            onClick={() => setSelectedForm('political_parties')}
            className="md:col-span-2 md:row-span-1 bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative group flex flex-col justify-between text-left hover:border-blue-400 min-h-[140px] md:min-h-0"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <Building2 className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-blue-600" strokeWidth={2} />
              </div>
              <Plus className="w-4 h-4 md:w-5 md:h-5 text-slate-200 group-hover:text-blue-600 transition-all" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm md:text-base">Partido Político</h3>
              <p className="text-slate-400 text-[9px] md:text-[10px] font-bold mt-1">Nuevas siglas y estatutos</p>
            </div>
          </button>

          {/* Nueva Encuesta */}
          <button 
            onClick={() => setSelectedForm('surveys')}
            className="md:col-span-2 md:row-span-1 bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative group flex flex-col justify-between text-left hover:border-teal-400 min-h-[140px] md:min-h-0"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-50 rounded-lg md:rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-teal-600" strokeWidth={2} />
              </div>
              <div className="flex gap-1 h-6 items-end">
                <div className="w-1 bg-teal-100 rounded-full h-[40%] group-hover:bg-teal-500 transition-all"></div>
                <div className="w-1 bg-teal-100 rounded-full h-[90%] group-hover:bg-teal-500 transition-all delay-75"></div>
              </div>
            </div>
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm md:text-base">Nueva Encuesta</h3>
              <p className="text-slate-400 text-[9px] md:text-[10px] font-bold mt-1">Intención de voto verificada</p>
            </div>
          </button>

          {/* Registrar Ubicación */}
          <button 
            onClick={() => setSelectedForm('locations')}
            className="md:col-span-3 md:row-span-1 bg-white border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-center justify-between group hover:border-blue-400 hover:shadow-xl transition-all min-h-[100px] md:min-h-0"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-[2rem] flex items-center justify-center group-hover:bg-blue-50 transition-colors shrink-0">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-slate-400 group-hover:text-blue-600" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter">Registrar Ubicación</h3>
                <p className="text-slate-500 text-[10px] md:text-xs font-medium">Añadir nuevos centros de votación.</p>
              </div>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
              <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
            </div>
          </button>

          {/* Protocolo Info Card */}
          <div className="md:col-span-3 md:row-span-1 bg-blue-50 border border-blue-100 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-center gap-4 md:gap-6 min-h-[100px] md:min-h-0">
            <div className="shrink-0">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-blue-900 font-bold text-xs md:text-sm uppercase tracking-wider md:tracking-widest">Protocolo de Datos</h4>
              <p className="text-blue-700/70 text-[10px] md:text-xs mt-1 leading-relaxed">
                Toda información enviada pasará por un filtro de revisión de 24 horas para asegurar la imparcialidad del sistema.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
            Elecciones Subnacionales 2026 • Bolivia
          </p>
        </footer>

      </main>
    </div>
  );
}
