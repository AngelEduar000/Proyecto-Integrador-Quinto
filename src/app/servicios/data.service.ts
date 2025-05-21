import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://proyecto-integrador-quinto-backend.vercel.app/api'; // 🔁 Cambia esto por la URL real de tu API

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) {}

  // Obtener todos los conglomerados desde la API
  getConglomerados(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/mostrar_conglomerado`);
  }

  // Obtener especies desde la API
  getEspecies(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/especies`);
  }

  // Obtener regiones desde la API
  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/regiones`);
  }

  // Método genérico si deseas usar rutas dinámicas
  getJSON<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${BASE_URL}/${endpoint}`);
  }
}
