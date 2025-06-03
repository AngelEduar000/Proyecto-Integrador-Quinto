import { Subparcela } from "./subparcela";

export interface ConglomeradoConSubparcelas {
  id_conglomerado: number;
  identificador: string;
  subparcelas: Subparcela[];
}
