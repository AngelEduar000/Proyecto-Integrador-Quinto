import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especie {
  nombre_comun: string;
  nombre_cientifico: string;
  familia: string;
  uso: string;
  region: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecieService {
  
  private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api';

  constructor(private http: HttpClient) {}

  obtenerEspecies(): Observable<Especie[]> {
    return this.http.get<Especie[]>(`${this.apiUrl}/mostrar_especie`);
  }

  obtenerImagen( nombre: string ): string {
    return `${this.apiUrl}/imagen_especie/${nombre}`;
  }
}
