import { COLLECTIONS } from '../lib/appwrite-client';

export interface FormField {
  name: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'date' | 'boolean' | 'select' | 'relation' | 'image' | 'color_picker' | 'url' | 'float';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  relationCollection?: string;
  relationDisplayField?: string;
  multiple?: boolean;
  accept?: string;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface FormConfig {
  id: string;
  title: string;
  description: string;
  collectionId: string;
  icon?: string;
  fields: FormField[];
  hasSubforms?: boolean;
  subforms?: {
    collectionId: string;
    parentField: string;
    fields: FormField[];
  }[];
}

export const FORM_CONFIGS: FormConfig[] = [
  {
    id: 'candidates',
    title: 'Registrar Candidato',
    description: 'Agregar un nuevo candidato electoral',
    collectionId: COLLECTIONS.CANDIDATES,
    icon: '👤',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Nombre Completo',
        required: true,
        placeholder: 'Juan Pérez García',
      },
      {
        name: 'political_party',
        type: 'relation',
        label: 'Partido Político',
        required: true,
        relationCollection: COLLECTIONS.POLITICAL_PARTIES,
        relationDisplayField: 'name',
      },
      {
        name: 'target_position',
        type: 'select',
        label: 'Cargo al que aspira',
        required: true,
        options: [
          { value: 'gobernador', label: 'Gobernador' },
          { value: 'alcalde', label: 'Alcalde' },
          { value: 'asambleista', label: 'Asambleísta' },
          { value: 'consejal', label: 'Consejal' },
        ],
      },
      {
        name: 'location',
        type: 'relation',
        label: 'Ubicación',
        required: true,
        relationCollection: COLLECTIONS.LOCATIONS,
        relationDisplayField: 'name',
      },
      {
        name: 'foto',
        type: 'image',
        label: 'Foto del Candidato',
        accept: 'image/*',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Biografía',
        placeholder: 'Breve descripción del candidato...',
      },
      {
        name: 'website',
        type: 'url',
        label: 'Sitio Web',
        placeholder: 'https://ejemplo.com',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email de Contacto',
        placeholder: 'candidato@ejemplo.com',
      },
      {
        name: 'phone',
        type: 'text',
        label: 'Teléfono',
        placeholder: '+591 7xxxxxxx',
      },
      {
        name: 'birth_date',
        type: 'date',
        label: 'Fecha de Nacimiento',
      },
    ],
  },
  {
    id: 'political_parties',
    title: 'Registrar Partido Político',
    description: 'Agregar un nuevo partido político',
    collectionId: COLLECTIONS.POLITICAL_PARTIES,
    icon: '🏛️',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Nombre del Partido',
        required: true,
        placeholder: 'Movimiento Al Socialismo',
      },
      {
        name: 'initials',
        type: 'text',
        label: 'Sigla',
        required: true,
        placeholder: 'MAS',
      },
      {
        name: 'logo',
        type: 'image',
        label: 'Logo del Partido',
        accept: 'image/*',
      },
      {
        name: 'hex_colors',
        type: 'color_picker',
        label: 'Colores del Partido',
        multiple: true,
        description: 'Selecciona hasta 3 colores representativos',
      },
      {
        name: 'founded_year',
        type: 'number',
        label: 'Año de Fundación',
        min: 1800,
        max: new Date().getFullYear(),
      },
      {
        name: 'website',
        type: 'url',
        label: 'Sitio Web Oficial',
        placeholder: 'https://partido.bo',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Descripción',
        placeholder: 'Historia y descripción del partido...',
      },
      {
        name: 'ideology',
        type: 'select',
        label: 'Ideología',
        options: [
          { value: 'izquierda', label: 'Izquierda' },
          { value: 'centro-izquierda', label: 'Centro Izquierda' },
          { value: 'centro', label: 'Centro' },
          { value: 'centro-derecha', label: 'Centro Derecha' },
          { value: 'derecha', label: 'Derecha' },
        ],
      },
    ],
  },
  {
    id: 'surveys',
    title: 'Registrar Encuesta',
    description: 'Agregar una nueva encuesta electoral',
    collectionId: COLLECTIONS.SURVEYS,
    icon: '📊',
    hasSubforms: true,
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Título de la Encuesta',
        required: true,
        placeholder: 'Encuesta CIE Febrero 2026',
      },
      {
        name: 'pollster',
        type: 'relation',
        label: 'Encuestadora',
        required: true,
        relationCollection: COLLECTIONS.CANDIDATES, // TODO: Should be POLLSTERS
        relationDisplayField: 'name',
      },
      {
        name: 'publication_date',
        type: 'date',
        label: 'Fecha de Publicación',
        required: true,
      },
      {
        name: 'survey_date_start',
        type: 'date',
        label: 'Fecha de Inicio del Trabajo de Campo',
        required: true,
      },
      {
        name: 'survey_date_end',
        type: 'date',
        label: 'Fecha de Fin del Trabajo de Campo',
        required: true,
      },
      {
        name: 'sample_size',
        type: 'number',
        label: 'Tamaño de Muestra',
        required: true,
        min: 1,
      },
      {
        name: 'margin_error_declared',
        type: 'float',
        label: 'Margen de Error Declarado (%)',
        required: true,
        min: 0,
        max: 100,
        step: 0.1,
        description: 'Porcentaje (ej: 3.5 para 3.5%)',
      },
      {
        name: 'technical_sheet_url',
        type: 'url',
        label: 'URL de Ficha Técnica',
        placeholder: 'https://ejemplo.com/ficha-tecnica.pdf',
      },
    ],
    subforms: [
      {
        collectionId: COLLECTIONS.SURVEY_RESULTS,
        parentField: 'survey',
        fields: [
          {
            name: 'candidate',
            type: 'relation',
            label: 'Candidato',
            required: true,
            relationCollection: COLLECTIONS.CANDIDATES,
            relationDisplayField: 'name',
          },
          {
            name: 'percentage',
            type: 'float',
            label: 'Porcentaje (%)',
            required: true,
            min: 0,
            max: 100,
            step: 0.1,
          },
          {
            name: 'votes',
            type: 'number',
            label: 'Votos Absolutos',
            min: 0,
          },
          {
            name: 'ranking',
            type: 'number',
            label: 'Posición',
            required: true,
            min: 1,
          },
          {
            name: 'trend',
            type: 'select',
            label: 'Tendencia',
            options: [
              { value: 'up', label: '↗ Subiendo' },
              { value: 'down', label: '↘ Bajando' },
              { value: 'stable', label: '→ Estable' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'locations',
    title: 'Registrar Ubicación',
    description: 'Agregar una nueva ubicación geográfica',
    collectionId: COLLECTIONS.LOCATIONS,
    icon: '📍',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Nombre de la Ubicación',
        required: true,
        placeholder: 'La Paz',
      },
      {
        name: 'type',
        type: 'select',
        label: 'Tipo de Ubicación',
        required: true,
        options: [
          { value: 'pais', label: 'País' },
          { value: 'departamento', label: 'Departamento' },
          { value: 'provincia', label: 'Provincia' },
          { value: 'distrito', label: 'Distrito' },
          { value: 'municipio', label: 'Municipio' },
        ],
      },
      {
        name: 'parent_location',
        type: 'relation',
        label: 'Ubicación Padre',
        relationCollection: COLLECTIONS.LOCATIONS,
        relationDisplayField: 'name',
        description: 'La ubicación de nivel superior (ej: departamento para una provincia)',
      },
      {
        name: 'latitude',
        type: 'float',
        label: 'Latitud',
        step: 0.000001,
      },
      {
        name: 'longitude',
        type: 'float',
        label: 'Longitud',
        step: 0.000001,
      },
      {
        name: 'population',
        type: 'number',
        label: 'Población',
        min: 0,
      },
    ],
  },
];

export function getFormById(id: string): FormConfig | undefined {
  return FORM_CONFIGS.find((form) => form.id === id);
}

export function getAllForms(): FormConfig[] {
  return FORM_CONFIGS;
}
