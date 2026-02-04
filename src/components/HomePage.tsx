import React from 'react';
import { useCompleteElectionData } from '../hooks/useAppwriteData';
import { useAuth } from '../lib/auth-context';
import { Loader2, ArrowRight, Plus, Users, TrendingUp, MapPin, Lock } from 'lucide-react';
import SkeletonHome from './ui/skeleton-home';

export function HomePage() {
  const { stats, loading, error } = useCompleteElectionData();
  const { isAuthenticated, isGuest } = useAuth();

  if (loading) {
    return (
      <SkeletonHome />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error al cargar datos</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen pt-24 md:pt-32">
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">Bolivia Transparente</span>
            <h1 className="text-5xl font-extrabold tracking-tighter mt-2">Elecciones <span className="text-slate-400">2026</span></h1>
            <p className="text-slate-500 font-medium mt-1 italic">Plataforma colaborativa de datos electorales</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold text-slate-400 uppercase">Estado del Sistema</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-slate-700">Datos Actualizados</span>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">

          {/* Hero Card - Explorar */}
          <div className="md:col-span-3 md:row-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold leading-tight max-w-md">Explora la base de datos de candidatos más completa.</h2>
              <div className="mt-6 flex gap-3">
                <a 
                  href="/explorar" 
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all inline-block"
                >
                  Explorar Ahora
                </a>
                <button 
                  onClick={() => window.location.href = '/explorar'}
                  className="bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all"
                >
                  Ver Mapa
                </button>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Contribuir Card */}
          {isAuthenticated && !isGuest ? (
            <a 
              href="/contribuir"
              className="md:col-span-1 md:row-span-1 bg-blue-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-blue-100 group hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Plus className="w-6 h-6" strokeWidth={2} />
                </div>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Contribuir</h3>
                <p className="text-blue-100 text-sm mt-1">Sube actas o verifica datos</p>
              </div>
            </a>
          ) : (
            <div className="md:col-span-1 md:row-span-1 bg-slate-200 rounded-[2.5rem] p-8 text-slate-600 flex flex-col justify-between shadow-xl opacity-60 cursor-not-allowed relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="bg-white/40 p-3 rounded-2xl">
                  <Lock className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-700">Contribuir</h3>
                <p className="text-slate-500 text-sm mt-1">
                  <a href="/login" className="text-blue-600 hover:underline font-semibold">Inicia sesión</a> para contribuir con datos
                </p>
              </div>
              <div className="absolute inset-0 bg-slate-300/20 "></div>
            </div>
          )}

          {/* Candidatos Card */}
          <a
            href="/explorar"
            className="md:col-span-1 md:row-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col group overflow-hidden relative cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <div className="z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-blue-400" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">Candidatos</h3>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">Perfil completo de gobernadores, alcaldes y asambleístas por región.</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <span className="text-4xl font-black">{stats.totalCandidates}</span>
                  <span className="text-xs text-slate-400 uppercase">Registrados</span>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-blue-400 font-bold text-sm">
                EXPLORAR DIRECTORIO 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
          </a>

          {/* Encuestas Card */}
          <div className="md:col-span-2 md:row-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex items-center justify-between shadow-sm group hover:shadow-md transition-shadow">
            <div className="max-w-[180px]">
              <h3 className="text-xl font-bold">Encuestas</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">Histórico de intención de voto verificado.</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-teal-50 rounded-full">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span className="text-lg font-bold text-teal-700">{stats.totalSurveys}</span>
                <span className="text-xs text-teal-600">disponibles</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-24">
              <div className="w-4 bg-teal-100 rounded-full h-[40%] group-hover:bg-teal-500 transition-all duration-500"></div>
              <div className="w-4 bg-teal-100 rounded-full h-[70%] group-hover:bg-teal-500 transition-all duration-700"></div>
              <div className="w-4 bg-teal-100 rounded-full h-[55%] group-hover:bg-teal-500 transition-all duration-300"></div>
              <div className="w-4 bg-teal-100 rounded-full h-[90%] group-hover:bg-teal-500 transition-all duration-1000"></div>
              <div className="w-4 bg-teal-100 rounded-full h-[65%] group-hover:bg-teal-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Partidos Políticos Card */}
          <div className="md:col-span-1 md:row-span-1 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-6xl font-black text-emerald-700 tracking-tighter">{stats.totalParties}</span>
            <span className="text-emerald-600/70 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Partidos Políticos</span>
          </div>

          {/* Ubicaciones Card */}
          <div className="md:col-span-2 md:row-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex items-center gap-8 shadow-sm group hover:shadow-md transition-shadow">
            <div className="bg-slate-50 p-6 rounded-[2rem] group-hover:bg-blue-50 transition-colors">
              <MapPin className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">{stats.totalLocations}</span>
                <span className="text-slate-400 font-bold text-xl uppercase tracking-tighter italic">Ubicaciones</span>
              </div>
              <p className="text-slate-500 text-sm mt-1 font-medium">Cobertura total en los 9 departamentos.</p>
            </div>
          </div>

          {/* Pollsters Card */}
          <div className="md:col-span-1 md:row-span-1 bg-[#F1F5F9] rounded-[2.5rem] p-8 flex flex-col justify-center items-center hover:bg-slate-100 transition-colors">
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Encuestadoras</div>
            <div className="text-4xl font-black text-slate-800">{stats.totalPollsters}</div>
            <div className="mt-2 flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-[#F1F5F9] bg-blue-400"></div>
              <div className="w-6 h-6 rounded-full border-2 border-[#F1F5F9] bg-teal-400"></div>
              <div className="w-6 h-6 rounded-full border-2 border-[#F1F5F9] bg-slate-400"></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-400 text-xs font-bold tracking-[0.2em] uppercase py-8 border-t border-slate-100">
          © 2026 Plataforma de Transparencia Bolivia • Hecho por desarrolladores para ciudadanos
        </footer>
      </main>
    </div>
  );
}
