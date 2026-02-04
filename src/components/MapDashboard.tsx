import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Map } from '@/components/ui/map';
import maplibregl from 'maplibre-gl';
import { LocationBadges } from './LocationBadges';
import { MapControls } from './map/MapControls';
import { MapInfoOverlay } from './map/MapInfoOverlay';
import { useGeolocation } from './map/useGeolocation';
import { useLocations } from '@/hooks/useAppwriteData';
import {
  findFeatureAtLocation,
  highlightFeature,
  resetMapHighlight,
  createUserMarker,
  getLocationHierarchy,
  type LocationInfo
} from './map/mapUtils';
import 'maplibre-gl/dist/maplibre-gl.css';

interface UserLocation {
  lng: number;
  lat: number;
}

interface MapDashboardProps {
  onLocationFilter?: (provinciaCodigo: string) => void;
}

export function DashboardMapa({ onLocationFilter }: MapDashboardProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const geojsonDataRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [locationBadges, setLocationBadges] = useState<LocationInfo[]>([]);
  
  const { getLocation, isGettingLocation, locationError, clearError } = useGeolocation();
  const { locations, loading: loadingLocations } = useLocations();

  // Crear mapa de ubicaciones nombre => código INE
  const ubicacionesMap = useMemo(() => {
    const map: Record<string, string> = {};
    locations.forEach(loc => {
      map[loc.INE_code] = loc.name;
    });
    return map;
  }, [locations]);

  // Convertir locations de Appwrite a GeoJSON
  const geojsonData = useMemo(() => {
    if (locations.length === 0) return null;

    return {
      type: 'FeatureCollection',
      features: locations
        .filter(loc => loc.geometry && loc.geometry.length > 0)
        .map(loc => ({
          type: 'Feature',
          properties: {
            nombre: loc.name,
            codigo: loc.INE_code,
            tipo: loc.type,
            parent: loc.parent || ''
          },
          geometry: {
            type: 'Polygon',
            coordinates: loc.geometry
          }
        }))
    };
  }, [locations]);

  // Inicializar el mapa con datos de Appwrite
  const handleMapRef = (map: maplibregl.Map | null) => {
    if (!map || mapRef.current) return;
    mapRef.current = map;

    map.on('load', () => {
      if (!geojsonData) {
        console.error('No hay datos GeoJSON disponibles');
        setIsLoading(false);
        return;
      }

      geojsonDataRef.current = geojsonData;
      
      map.addSource('locations', {
        type: 'geojson',
        data: geojsonData
      });

      map.addLayer({
        id: 'locations-fill',
        type: 'fill',
        source: 'locations',
        paint: {
          'fill-color': '#3b82f6',
          'fill-opacity': 0.6
        }
      });

      map.addLayer({
        id: 'locations-border',
        type: 'line',
        source: 'locations',
        paint: {
          'line-color': '#1e40af',
          'line-width': 1.5
        }
      });

      map.on('click', 'locations-fill', (e: any) => {
        if (e.features?.[0]) {
          const feature = e.features[0];
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<strong>${feature.properties.nombre}</strong>`)
            .addTo(map);
        }
      });

      map.on('mouseenter', 'locations-fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'locations-fill', () => {
        map.getCanvas().style.cursor = '';
      });

      setIsLoading(false);
    });
  };

  const handleGetLocation = async () => {
    try {
      const { longitude, latitude } = await getLocation();
      const newLocation = { lng: longitude, lat: latitude };
      
      setUserLocation(newLocation);

      if (!mapRef.current) return;

      // Remover marcador anterior
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Crear nuevo marcador
      markerRef.current = createUserMarker(mapRef.current, longitude, latitude);

      // Centrar el mapa
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 10,
        duration: 2000
      });

      // Encontrar y resaltar el feature
      const feature = findFeatureAtLocation(geojsonDataRef.current, longitude, latitude);
      if (feature) {
        setSelectedFeature(feature);
        highlightFeature(mapRef.current, feature.properties.codigo);
        
        const badges = getLocationHierarchy(feature.properties.codigo, ubicacionesMap);
        setLocationBadges(badges);
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setSelectedFeature(null);
    setLocationBadges([]);
    clearError();
    
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    if (mapRef.current) {
      resetMapHighlight(mapRef.current);
      mapRef.current.flyTo({
        center: [-64.5, -16.5],
        zoom: 5,
        duration: 2000
      });
    }
  };

  const handleFilterByLocation = () => {
    if (!selectedFeature || !onLocationFilter) {
      console.log('⚠️ No hay feature seleccionado o callback');
      return;
    }
    
    const codigo = selectedFeature.properties.codigo;
    // Usar código de provincia (4 dígitos)
    const provinciaCodigo = codigo.substring(0, 4);
    
    console.log('📍 Filtrando por provincia:', provinciaCodigo);
    onLocationFilter(provinciaCodigo);
  };

  // Esperar a que los datos estén cargados antes de inicializar el mapa
  useEffect(() => {
    if (loadingLocations || !geojsonData) {
      return;
    }

    const timer = setTimeout(() => {
      const mapContainer = document.querySelector('.maplibregl-canvas')?.parentElement?.parentElement as any;
      if (mapContainer?._map) {
        handleMapRef(mapContainer._map);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [geojsonData, loadingLocations]);

  return (
    <div className="relative w-full h-150 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <Map center={[-64.5, -16.5]} zoom={5} ref={handleMapRef} />
      
      <MapControls
        hasLocation={!!userLocation}
        isGettingLocation={isGettingLocation}
        onGetLocation={handleGetLocation}
        onClearLocation={handleClearLocation}
      />

      <MapInfoOverlay
        isLoading={isLoading || loadingLocations}
        hasSelectedFeature={!!selectedFeature}
        locationError={locationError}
      />

      {locationBadges.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <LocationBadges 
            locations={locationBadges} 
            onFilterClick={onLocationFilter ? handleFilterByLocation : undefined}
            isFiltering={!!selectedFeature}
          />
        </div>
      )}
    </div>
  );
}
