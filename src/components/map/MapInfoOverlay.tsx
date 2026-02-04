import { MapPin, Loader2, AlertCircle } from 'lucide-react';

interface MapInfoOverlayProps {
  isLoading: boolean;
  hasSelectedFeature: boolean;
  locationError: string | null;
}

export function MapInfoOverlay({ isLoading, hasSelectedFeature, locationError }: MapInfoOverlayProps) {
  return (
    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow border border-slate-100 max-w-xs z-10">
      <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
        {hasSelectedFeature ? (
          <>
            <MapPin className="w-4 h-4 text-red-500" />
            Ubicación detectada
          </>
        ) : (
          'Mapa Electoral'
        )}
      </h3>
      <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
        {isLoading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin mt-0.5 flex-shrink-0" />
            <span>Cargando datos...</span>
          </>
        ) : (
          'Haz clic en el mapa o usa el botón para detectar tu ubicación y filtrar candidatos'
        )}
      </p>
      {locationError && (
        <p className="text-xs text-red-600 mt-2 flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{locationError}</span>
        </p>
      )}
    </div>
  );
}
