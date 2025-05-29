import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../interfaces/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  private url = 'https://proyecto-integrador-quinto-backend.vercel.app/api/mostrar_municipios'; // Cambia aquí por tu URL real

  constructor(private http: HttpClient) {}

  obtenerMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.url);
  }
}
