import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConglomeradoConSubparcelas } from '../interfaces/conglomerado_subparcela';
import { EspecieId } from '../interfaces/especie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class investigacionService {
  private urlConglomeradoSubparcela = 'https://proyecto-integrador-quinto-backend.vercel.app/api/conglomerado_subparcela';
  private urlEspecie = 'https://proyecto-integrador-quinto-backend.vercel.app/api/especie';
  private urlGuardarMuestra = 'https://proyecto-integrador-quinto-backend.vercel.app/api/gestion_arbol'; // Asegúrate que esta ruta exista en tu backend

  constructor(private http: HttpClient) {}

  obtenerConglomerados(): Observable<ConglomeradoConSubparcelas[]> {
    return this.http.get<ConglomeradoConSubparcelas[]>(this.urlConglomeradoSubparcela);
  }

  obtenerEspecie(): Observable<EspecieId[]> {
    return this.http.get<EspecieId[]>(this.urlEspecie);
  }

  // ✅ Método faltante para enviar los datos
  guardarMuestra(muestra: FormData): Observable<any> {
    return this.http.post(this.urlGuardarMuestra, muestra);
  }
}
