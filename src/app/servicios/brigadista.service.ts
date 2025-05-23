// src/app/services/brigadistas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brigadista } from '../interfaces/brigadista';

@Injectable({
  providedIn: 'root'
})
export class BrigadistasService {
  private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api/brigadistas';

  constructor(private http: HttpClient) {}

  // Obtener todos los brigadistas
  obtenerBrigadistas(): Observable<Brigadista[]> {
    return this.http.get<Brigadista[]>(this.apiUrl);
  }

  // Obtener un brigadista por ID
  obtenerBrigadistaPorId(id: number): Observable<Brigadista> {
    return this.http.get<Brigadista>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo brigadista
  agregarBrigadista(brigadista: Brigadista): Observable<Brigadista> {
    return this.http.post<Brigadista>(this.apiUrl, brigadista);
  }

  // Actualizar un brigadista existente
  actualizarBrigadista(id: number, brigadista: Brigadista): Observable<Brigadista> {
    return this.http.put<Brigadista>(`${this.apiUrl}/${id}`, brigadista);
  }

  // Eliminar un brigadista por ID
  eliminarBrigadista(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
