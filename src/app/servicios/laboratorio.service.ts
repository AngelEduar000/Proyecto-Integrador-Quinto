import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Muestra } from '../interfaces/muestra';
import { EspecieId } from '../interfaces/especie';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private apiUrlMuestra = 'https://proyecto-integrador-quinto-backend.vercel.app/api/laboratorio';
  private apiUrlEspecie = 'https://proyecto-integrador-quinto-backend.vercel.app/api/especie';

  constructor(private http: HttpClient) { }

  obtenerMuestras(): Observable<Muestra[]> {
    return this.http.get<Muestra[]>(this.apiUrlMuestra);
  }

  obtenerEspecie(): Observable<EspecieId[]> {
    return this.http.get<EspecieId[]>(this.apiUrlEspecie);
  }

actualizarMuestra(id: number, data: Partial<Muestra>): Observable<any> {
  return this.http.put(`${this.apiUrlMuestra}/${id}/especie`, data);
}
}
