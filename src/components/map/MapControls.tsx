import { MapPin, X, Loader2 } from 'lucide-react';

interface MapControlsProps {
  hasLocation: boolean;
  isGettingLocation: boolean;
  onGetLocation: () => void;
  onClearLocation: () => void;
}

export function MapControls({ 
  hasLocation, 
  isGettingLocation, 
  onGetLocation, 
  onClearLocation 
}: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      {!hasLocation ? (
        <button
          onClick={onGetLocation}
          disabled={isGettingLocation}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 transition-colors"
          aria-label="Usar mi ubicación"
        >
          {isGettingLocation ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          {isGettingLocation ? 'Obteniendo...' : 'Usar mi ubicación'}
        </button>
      ) : (
        <button
          onClick={onClearLocation}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 transition-colors"
          aria-label="Limpiar ubicación"
        >
          <X className="w-5 h-5" />
          Limpiar
        </button>
      )}
    </div>
  );
}
