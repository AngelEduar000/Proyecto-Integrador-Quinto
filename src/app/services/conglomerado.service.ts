import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Conglomerado {
  id: number;
  identificador: string;
  fechaCreacion: Date;
  fechaEstablecimiento: Date;
  region: string;
  municipio: string;
  coordenadas: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConglomeradoService {

  private apiUrl = 'http://tuservidor.com/api/conglomerados';

  constructor(private http: HttpClient) {}

  getConglomerados(): Observable<Conglomerado[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        ...item,
        fechaCreacion: new Date(item.fechaCreacion),
        fechaEstablecimiento: new Date(item.fechaEstablecimiento)
      })))
    );
  }
}
