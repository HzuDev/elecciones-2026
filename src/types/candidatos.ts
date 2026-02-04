export interface Candidato {
  nombre: string;
  candidatura: string;
  organizacion: string;
  departamento: string;
  genero: string;
  edad: number;
  fechaNacimiento: string;
  carnet: string;
  foto: string;
  titularidad: string;
}

export interface Ubicacion {
  codigo: string;
  nombres: string;
}

export interface LocationFilter {
  departamento: string;
  municipio?: string;
}
