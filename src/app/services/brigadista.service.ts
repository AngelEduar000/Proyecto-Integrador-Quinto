// src/app/services/brigadistas.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrigadistasService {
  private brigadistas = [
    { id: 1, nombre: 'Ana López', rol: 'Investigador' },
    { id: 2, nombre: 'Carlos Ruiz', rol: 'CoInvestigador' },
    { id: 3, nombre: 'Diana Gómez', rol: 'Investigador' }
  ];

  getBrigadistas(): Observable<any[]> {
    return of(this.brigadistas); // esto luego será una llamada HTTP
  }
}
