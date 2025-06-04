import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brigada {
  id_brigada: number;
  nombre_brigada: string;
  nombre_jefe_brigada: string;
  nombre_investigador: string;
  nombre_coinvestigador: string;
  identificador_conglomerado: string;
  fecha_visita: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrigadaService {
  private url = 'https://proyecto-integrador-quinto-backend.vercel.app/api/obtener_brigada';

  constructor(private http: HttpClient) {}

  obtenerBrigadas(): Observable<Brigada[]> {
    return this.http.get<Brigada[]>(this.url);
  }
}
