export interface Muestra {
  id_muestra: number;
  conglomerado: string;
  numero_subparcela: number;
  id_especie: number;
  altura_arbol: string;
  diametro_arbol: string;
  observaciones: string;
  identificador_muestra: string;
  tipo_muestra: string;
  imagen_muestra: string | null; // base64
}
