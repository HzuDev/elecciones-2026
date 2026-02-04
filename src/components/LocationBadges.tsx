import React from 'react';
import { MapPin, Check } from 'lucide-react';

interface LocationBadge {
  label: string;
  codigo: string;
  nivel?: 'departamento' | 'provincia' | 'municipio';
}

interface LocationBadgesProps {
  locations: LocationBadge[];
  onFilterClick?: () => void;
  isFiltering?: boolean;
}

export const LocationBadges: React.FC<LocationBadgesProps> = ({ 
  locations, 
  onFilterClick,
  isFiltering 
}) => {
  if (locations.length === 0) return null;

  const getColorByNivel = (nivel?: string) => {
    switch (nivel) {
      case 'departamento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'provincia':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'municipio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <MapPin className="w-5 h-5 text-red-500" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-slate-700">Tu ubicación:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {locations.map((location, index) => (
              <span
                key={`${location.codigo}-${index}`}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${getColorByNivel(location.nivel)}`}
              >
                {location.label}
                <span className="ml-1.5 text-xs opacity-75">({location.codigo})</span>
              </span>
            ))}
          </div>
          
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              disabled={isFiltering}
              className="mt-3 w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              {isFiltering ? `Usar como filtro (${locations.length} ubicaciones)` : `Usar como filtro (${locations.length} ubicación${locations.length > 1 ? 'es' : ''})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
