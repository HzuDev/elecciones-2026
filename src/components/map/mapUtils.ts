import * as turf from '@turf/turf';
import maplibregl from 'maplibre-gl';

export interface LocationInfo {
  label: string;
  codigo: string;
  nivel: 'departamento' | 'provincia' | 'municipio';
}

export function findFeatureAtLocation(geojsonData: any, lng: number, lat: number) {
  if (!geojsonData) return null;

  const point = turf.point([lng, lat]);
  
  for (const feature of geojsonData.features) {
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
      if (turf.booleanPointInPolygon(point, feature)) {
        return feature;
      }
    }
  }
  return null;
}

export function highlightFeature(map: maplibregl.Map, featureCodigo: string) {
  if (!map) return;

  map.setPaintProperty('departamentos-fill', 'fill-color', [
    'case',
    ['==', ['get', 'codigo'], featureCodigo],
    '#22c55e',
    '#3b82f6'
  ]);
}

export function resetMapHighlight(map: maplibregl.Map) {
  if (!map) return;
  map.setPaintProperty('departamentos-fill', 'fill-color', '#3b82f6');
}

export function createUserMarker(map: maplibregl.Map, lng: number, lat: number): maplibregl.Marker {
  const el = document.createElement('div');
  el.className = 'user-location-marker';
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#ef4444';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
  el.style.cursor = 'pointer';

  return new maplibregl.Marker({ element: el })
    .setLngLat([lng, lat])
    .addTo(map);
}

export function getLocationHierarchy(codigo: string, ubicaciones: Record<string, string>): LocationInfo[] {
  const labels: LocationInfo[] = [];
  
  // Departamento (2 dígitos)
  const depCodigo = codigo.substring(0, 2);
  const depNombre = ubicaciones[depCodigo];
  if (depNombre) {
    labels.push({ label: depNombre, codigo: depCodigo, nivel: 'departamento' });
  }
  
  // Provincia (4 dígitos)
  if (codigo.length >= 4) {
    const provCodigo = codigo.substring(0, 4);
    const provNombre = ubicaciones[provCodigo];
    if (provNombre) {
      labels.push({ label: provNombre, codigo: provCodigo, nivel: 'provincia' });
    }
  }
  
  // Municipio (6 dígitos completos)
  if (codigo.length >= 6) {
    const munNombre = ubicaciones[codigo];
    if (munNombre) {
      labels.push({ label: munNombre, codigo: codigo, nivel: 'municipio' });
    }
  }
  
  return labels;
}
