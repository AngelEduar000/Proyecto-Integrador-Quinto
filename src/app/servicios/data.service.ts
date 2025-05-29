import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const BASE_URL = 'https://proyecto-integrador-quinto-backend.vercel.app/api';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(private http: HttpClient) {}

  // Obtener todos los conglomerados
  getConglomerados(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/mostrar_conglomerado`);
  }
  

  // Extraer especies únicas desde los conglomerados
  getEspecies(): Observable<string[]> {
    return this.getConglomerados().pipe(
      map(conglomerados => {
        const especies = new Set<string>();
        conglomerados.forEach(c => {
          c.especies.split(',').forEach((e: string) => especies.add(e.trim()));
        });
        return Array.from(especies);
      })
    );
  }

  // Extraer regiones únicas desde los conglomerados
  getRegiones(): Observable<string[]> {
    return this.getConglomerados().pipe(
      map(conglomerados => {
        const regiones = new Set<string>();
        conglomerados.forEach(c => regiones.add(c.region));
        return Array.from(regiones);
      })
    );
  }
}
