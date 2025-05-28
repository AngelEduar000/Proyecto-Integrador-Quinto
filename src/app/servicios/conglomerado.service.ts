// src/app/services/brigadistas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conglomerado } from '../interfaces/conglomerado';

@Injectable({
  providedIn: 'root'
})
export class ConglomeradosService {
  private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api/gestion-conglomerado';

  constructor(private http: HttpClient) {}

  // Obtener todos los conglomerado
  obtenerConglomerados(): Observable<Conglomerado[]> {
    return this.http.get<Conglomerado[]>(this.apiUrl);
  }

  // Obtener un conglomerado por ID
  obtenerConglomeradoPorId(id: number): Observable<Conglomerado> {
    return this.http.get<Conglomerado>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo conglomerado
  agregarConglomerado(conglomerado: Conglomerado): Observable<Conglomerado> {
    return this.http.post<Conglomerado>(this.apiUrl, conglomerado);
  }

  // Actualizar un conglomerado existente
  actualizarConglomerado(id: number, conglomerado: Conglomerado): Observable<Conglomerado> {
    return this.http.put<Conglomerado>(`${this.apiUrl}/${id}`, conglomerado);
  }

  // Eliminar un conglomerado por ID
  eliminarConglomerado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
