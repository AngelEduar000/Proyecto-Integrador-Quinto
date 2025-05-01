import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) {}

  // Leer conglomerados
  getConglomerados(): Observable<any[]> {
    return this.http.get<any[]>('assets/conglomerados.json');
  }

  // Leer especies
  getEspecies(): Observable<any[]> {
    return this.http.get<any[]>('assets/especies.json');
  }

  // Leer regiones
  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>('assets/regiones.json');
  }

  // Método genérico opcional (si quieres usar rutas dinámicas)
  getJSON<T>(path: string): Observable<T> {
    return this.http.get<T>(`assets/${path}`);
  }
}
