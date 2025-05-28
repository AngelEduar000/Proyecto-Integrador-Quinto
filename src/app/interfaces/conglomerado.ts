// interfaces/conglomerado.ts

export interface Conglomerado {
  id_conglomerado: number;
  identificador: string;
  fecha_creacion: Date;
  fecha_establecimiento: Date;
  nombre_region: string;
  nombre_municipio: string;
  coordenadas: number[];
}
