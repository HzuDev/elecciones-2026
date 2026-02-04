import { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite-client';
import type { Models } from 'appwrite';

const DATABASE_ID = '6977a82d000f96ceae0f';

export interface Candidate extends Models.Document {
  name: string;
  target_position: 'gobernador' | 'alcalde' | 'consejal' | 'asambleista_territorio' | 'asambleista_poblacion';
  location: string; // INE_code
  political_party: string; // $id
  foto?: string;
}

export interface PoliticalParty extends Models.Document {
  name: string;
  logo?: string;
  hex_colors?: string[];
  initials: string;
}

export interface Location extends Models.Document {
  name: string;
  INE_code: string;
  geometry?: any;
  type: 'departamento' | 'provincia' | 'municipio' | 'distrito';
  parent?: string;
  geo_keywords?: string[];
}

export interface Pollster extends Models.Document {
  name: string;
  logo?: string;
  hex_colors?: string[];
  oep_registered: boolean;
}

export interface Survey extends Models.Document {
  pollster: string; // $id
  publication_date: string;
  sample_size?: number;
  technical_sheet_url?: string;
  margin_error_declared?: number;
  title?: string;
}

/**
 * Hook para cargar candidatos con sus relaciones pobladas
 */
export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCandidates() {
      try {
        setLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, 'candidates');
        setCandidates(response.documents as unknown as Candidate[]);
      } catch (err) {
        console.error('Error loading candidates:', err);
        setError(err instanceof Error ? err.message : 'Error loading candidates');
      } finally {
        setLoading(false);
      }
    }
    loadCandidates();
  }, []);

  return { candidates, loading, error };
}

/**
 * Hook para cargar todos los partidos políticos
 */
export function usePoliticalParties() {
  const [parties, setParties] = useState<PoliticalParty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadParties() {
      try {
        setLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, 'political_parties', []);
        setParties(response.documents as unknown as PoliticalParty[]);
      } catch (err) {
        console.error('Error loading parties:', err);
        setError(err instanceof Error ? err.message : 'Error loading political parties');
      } finally {
        setLoading(false);
      }
    }
    loadParties();
  }, []);

  return { parties, loading, error };
}

/**
 * Hook para cargar locations (departamentos, provincias, municipios)
 */
export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        setLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, 'locations', []);
        setLocations(response.documents as unknown as Location[]);
      } catch (err) {
        console.error('Error loading locations:', err);
        setError(err instanceof Error ? err.message : 'Error loading locations');
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

  return { locations, loading, error };
}

/**
 * Hook para cargar encuestas
 */
export function useSurveys() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSurveys() {
      try {
        setLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, 'surveys', []);
        setSurveys(response.documents as unknown as Survey[]);
      } catch (err) {
        console.error('Error loading surveys:', err);
        setError(err instanceof Error ? err.message : 'Error loading surveys');
      } finally {
        setLoading(false);
      }
    }
    loadSurveys();
  }, []);

  return { surveys, loading, error };
}

/**
 * Hook para cargar encuestadoras
 */
export function usePollsters() {
  const [pollsters, setPollsters] = useState<Pollster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPollsters() {
      try {
        setLoading(true);
        const response = await databases.listDocuments(DATABASE_ID, 'pollsters', []);
        setPollsters(response.documents as unknown as Pollster[]);
      } catch (err) {
        console.error('Error loading pollsters:', err);
        setError(err instanceof Error ? err.message : 'Error loading pollsters');
      } finally {
        setLoading(false);
      }
    }
    loadPollsters();
  }, []);

  return { pollsters, loading, error };
}

/**
 * Hook completo que carga todas las entidades y las relaciona
 */
export function useCompleteElectionData() {
  const { candidates, loading: loadingCandidates, error: errorCandidates } = useCandidates();
  const { parties, loading: loadingParties, error: errorParties } = usePoliticalParties();
  const { locations, loading: loadingLocations, error: errorLocations } = useLocations();
  const { surveys, loading: loadingSurveys, error: errorSurveys } = useSurveys();
  const { pollsters, loading: loadingPollsters, error: errorPollsters } = usePollsters();

  const loading = loadingCandidates || loadingParties || loadingLocations || loadingSurveys || loadingPollsters;
  const error = errorCandidates || errorParties || errorLocations || errorSurveys || errorPollsters;

  // Crear mapas para lookups rápidos
  const partiesMap = new Map(parties.map(p => [p.$id, p]));
  const locationsMap = new Map(locations.map(l => [l.INE_code, l]));
  const pollstersMap = new Map(pollsters.map(p => [p.$id, p]));

  // Candidatos con relaciones pobladas
  const candidatesWithRelations = candidates.map(c => ({
    ...c,
    political_party: partiesMap.get(c.political_party) || c.political_party,
    location: locationsMap.get(c.location) || c.location,
  }));

  // Encuestas con relaciones pobladas
  const surveysWithRelations = surveys.map(s => ({
    ...s,
    pollster: pollstersMap.get(s.pollster) || s.pollster,
  }));

  return {
    candidates: candidatesWithRelations,
    parties,
    locations,
    surveys: surveysWithRelations,
    pollsters,
    loading,
    error,
    stats: {
      totalCandidates: candidates.length,
      totalParties: parties.length,
      totalLocations: locations.length,
      totalSurveys: surveys.length,
      totalPollsters: pollsters.length,
    }
  };
}
