import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {
  private seleccion$ = new BehaviorSubject<any>(null);

  setSeleccion(conglomerado: any) {
    this.seleccion$.next(conglomerado);
  }

  getSeleccion() {
    return this.seleccion$.asObservable();
  }

  getSeleccionActual() {
    return this.seleccion$.value;
  }
}
