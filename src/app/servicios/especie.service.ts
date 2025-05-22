import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Especie {
  nombre_comun: string;
  nombre_cientifico: string;
  familia: string;
  uso: string;
  region: string[];  
}

@Injectable({
  providedIn: 'root'
})
export class EspecieService {
  private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api';

  constructor(private http: HttpClient) {}

  obtenerEspecies(): Observable<Especie[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<Especie[]>(`${this.apiUrl}/mostrar_especie`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener especies:', error);
        return of([]); // Retorna arreglo vacío si hay error
      })
    );
  }

  obtenerImagen(nombre: string): string {
    return `${this.apiUrl}/imagen_especie/${encodeURIComponent(nombre)}`;
  }
}
