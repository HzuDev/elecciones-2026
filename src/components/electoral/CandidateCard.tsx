import React, { memo } from 'react';
import { User, CheckCircle } from 'lucide-react';

export interface CandidateCardProps {
  candidate: {
    $id: string;
    name: string;
    political_party?: string | {
      name: string;
      initials?: string;
      hex_colors?: string[];
    };
    target_position?: string;
    location?: string | {
      name: string;
    };
    foto?: string;
    description?: string;
  };
  onClick?: () => void;
}

const POSITION_LABELS: Record<string, string> = {
  gobernador: 'Gobernador',
  alcalde: 'Alcalde',
  asambleista: 'Asambleísta',
  consejal: 'Consejal',
};

export const CandidateCard = memo(function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const politicalParty = typeof candidate.political_party === 'object' ? candidate.political_party : undefined;
  const partyColors = politicalParty?.hex_colors || ['#3b82f6'];
  const locationName = typeof candidate.location === 'object' ? candidate.location.name : 'Sin ubicación';
  const position = candidate.target_position ? POSITION_LABELS[candidate.target_position] || candidate.target_position : 'Sin cargo';

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-[2.5rem] !p-0 group overflow-hidden hover:border-blue-400 transition-all shadow-md hover:shadow-2xl cursor-pointer"
    >
      {/* Header con color del partido */}
      <div
        className="h-2"
        style={{
          background: partyColors.length > 1
            ? `linear-gradient(to right, ${partyColors.join(', ')})`
            : partyColors[0],
        }}
      />
      
      <div className="p-8">
        {/* Foto y nombre */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-sm">
              {candidate.foto ? (
                <img
                  src={candidate.foto}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <User size={32} className="text-blue-500" strokeWidth={2} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md">
              <CheckCircle className="w-4 h-4 text-blue-600" strokeWidth={3} />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
              {candidate.name}
            </h2>
            {politicalParty && (
              <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                {politicalParty.initials || politicalParty.name}
              </p>
            )}
          </div>
        </div>

        {/* Grid de información */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-center border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cargo</span>
            <span className="text-xs font-extrabold text-slate-700">{position}</span>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 flex flex-col justify-center border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Región</span>
            <span className="text-xs font-extrabold text-slate-700 italic truncate">{locationName}</span>
          </div>
        </div>

        {/* Botón */}
        <button className="w-full py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-[0.98]">
          Ver Ficha Completa
        </button>
      </div>
    </div>
  );
});
