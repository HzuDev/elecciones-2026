import React, { useState } from 'react';
import { useCompleteElectionData } from '../../hooks/useAppwriteData';
import { useFilters } from '../../hooks/useFilters';
import { CandidateCard } from './CandidateCard';
import { CandidateModal } from './CandidateModal';
import { DashboardMapa } from '../MapDashboard';
import { Search, Loader2, MapIcon, Filter, CheckCircle, Plus } from 'lucide-react';

export function ElectoralExplorer() {
  const { candidates, parties, locations, loading, error } = useCompleteElectionData();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);

  const {
    filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearAllFilters,
  } = useFilters({
    data: candidates,
    searchFields: ['name'],
    initialFilters: {},
  });

  const handleLocationFilter = (locationCode: string | null) => {
    if (locationCode === null) {
      setFilter('location', null);
    } else {
      setFilter('locationPrefix', locationCode);
    }
    setShowMap(false);
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen pt-24 md:pt-32 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Search Card Skeleton */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm animate-pulse">
              <div className="mb-6 space-y-3">
                <div className="h-3 w-48 bg-slate-200 rounded-full"></div>
                <div className="h-10 w-80 bg-slate-200 rounded-2xl"></div>
              </div>
              <div className="h-16 w-full bg-slate-100 rounded-[2rem]"></div>
            </div>

            {/* Action Cards Skeleton */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="bg-slate-200 rounded-[2.5rem] p-8 animate-pulse">
                <div className="h-6 w-24 bg-slate-300 rounded-xl mb-2"></div>
                <div className="h-3 w-32 bg-slate-300 rounded-full"></div>
              </div>
              <div className="bg-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between animate-pulse">
                <div className="h-10 w-16 bg-slate-200 rounded-xl"></div>
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] px-8 py-6 flex gap-4 animate-pulse">
            <div className="h-10 w-32 bg-slate-100 rounded-2xl"></div>
            <div className="h-10 w-44 bg-slate-100 rounded-2xl"></div>
            <div className="h-10 w-44 bg-slate-100 rounded-2xl"></div>
            <div className="h-10 w-44 bg-slate-100 rounded-2xl"></div>
          </div>

          {/* Candidates Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm animate-pulse">
                <div className="h-2 bg-slate-200"></div>
                <div className="p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-slate-200 rounded-3xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-32 bg-slate-200 rounded-xl"></div>
                      <div className="h-3 w-20 bg-slate-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-16 bg-slate-100 rounded-2xl"></div>
                    <div className="h-16 bg-slate-100 rounded-2xl"></div>
                  </div>
                  <div className="h-12 w-full bg-slate-200 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error al cargar datos</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased min-h-screen pt-24 md:pt-32 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Search Card */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase">Base de Datos en Tiempo Real</span>
              <h1 className="text-4xl font-black tracking-tighter mt-1">
                Explorador <span className="text-slate-400 italic">Electoral</span>
              </h1>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar candidatos por nombre, partido o propuesta..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] pl-16 pr-8 py-5 text-sm font-medium focus:ring-8 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Action Cards */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <button
              onClick={() => setShowMap(!showMap)}
              className="bg-blue-600 rounded-[2.5rem] p-8 text-white flex items-center justify-between group hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <div className="text-left">
                <h3 className="font-black text-lg leading-none uppercase tracking-tighter">
                  {showMap ? 'Ocultar Mapa' : 'Vista Mapa'}
                </h3>
                <p className="text-blue-100 text-[10px] font-bold mt-1">Explora por territorio</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                <MapIcon className="w-6 h-6" strokeWidth={2.5} />
              </div>
            </button>
            
            {/* Results Count Card */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] !py-0 flex items-center justify-between shadow-sm bg-teal-50 border-teal-100 px-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-teal-700 tracking-tighter italic">{filteredData.length}</span>
                <span className="text-teal-600/70 font-bold text-xs uppercase tracking-widest">Resultado{filteredData.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-teal-500" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-lg">
            <DashboardMapa onLocationFilter={handleLocationFilter} />
          </div>
        )}

        {/* Filters Bar */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] !py-4 px-8 flex flex-wrap items-center gap-4 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
            <Filter className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filtrar por</span>
          </div>
          
          <select
            value={filters.target_position || ''}
            onChange={(e) => setFilter('target_position', e.target.value || null)}
            className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all appearance-none cursor-pointer w-44"
          >
            <option value="">Todos los cargos</option>
            <option value="gobernador">Gobernador</option>
            <option value="alcalde">Alcalde</option>
            <option value="asambleista">Asambleísta</option>
            <option value="consejal">Consejal</option>
          </select>

          <select
            value={filters.location || ''}
            onChange={(e) => setFilter('location', e.target.value || null)}
            className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all appearance-none cursor-pointer w-44"
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map((loc) => (
              <option key={loc.$id} value={loc.$id}>
                {loc.name}
              </option>
            ))}
          </select>

          <select
            value={filters.political_party || ''}
            onChange={(e) => setFilter('political_party', e.target.value || null)}
            className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all appearance-none cursor-pointer w-44"
          >
            <option value="">Todos los partidos</option>
            {parties.map((party) => (
              <option key={party.$id} value={party.$id}>
                {party.initials || party.name}
              </option>
            ))}
          </select>

          <button
            onClick={clearAllFilters}
            className="ml-auto text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            Limpiar
          </button>
        </div>

        {/* Candidates Grid */}
        {filteredData.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-slate-300">
            <Plus className="w-12 h-12 mb-4" strokeWidth={2} />
            <p className="text-xs font-bold uppercase tracking-widest">No se encontraron resultados</p>
            <button
              onClick={clearAllFilters}
              className="mt-6 px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((candidate) => (
              <CandidateCard
                key={candidate.$id}
                candidate={candidate}
                onClick={() => setSelectedCandidate(candidate)}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedCandidate && (
          <CandidateModal
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </div>
  );
}
