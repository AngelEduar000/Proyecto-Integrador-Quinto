import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrigadaService {


  constructor(private http: HttpClient) {}

    private apiUrl = 'https://proyecto-integrador-quinto-backend.vercel.app/api/brigada'; // ajusta si cambia el puerto

  crearBrigada(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  obtenerBrigadistasConNombre() {
  return this.http.get<{ id_brigadista: number, nombre_brigadista: string }[]>(
    'https://proyecto-integrador-quinto-backend.vercel.app/api/brigadistas_brigada'
  );
}

obtenerConglomeradosConIdentificador() {
  return this.http.get<{ id_conglomerado: number, identificador_conglomerado: string }[]>(
    'https://proyecto-integrador-quinto-backend.vercel.app/api/brigada_conglomerado'
  );
}
}
