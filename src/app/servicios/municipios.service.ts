import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api/mostrar_municipios'; // Asegúrate que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  obtenerMunicipios(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
