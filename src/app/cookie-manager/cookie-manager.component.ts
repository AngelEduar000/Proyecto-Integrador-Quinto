import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cookie-manager.component.html',
  styleUrls: ['./cookie-manager.component.css']
})
export class CookieManagerComponent {
  nombre = '';
  valor = '';
  dias!: number;
  resultado = '';
  mostrarModal = false;

  abrir() {
    this.mostrarModal = true;
    this.resultado = ''; // limpiar resultado al abrir
  }

  cerrar() {
    this.mostrarModal = false;
  }

  setCookie(nombre: string, valor: string, dias: number): void {
    if (!nombre) {
      this.resultado = 'El nombre de la cookie es obligatorio.';
      return;
    }
    const fechaExp = new Date();
    fechaExp.setTime(fechaExp.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expira = "expires=" + fechaExp.toUTCString();
    document.cookie = `${nombre}=${valor};${expira};path=/`;
    this.resultado = `Cookie "${nombre}" guardada.`;
  }

  getCookie(nombre: string): string | null {
    const nombreEQ = nombre + "=";
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(nombreEQ) === 0) {
        return c.substring(nombreEQ.length, c.length);
      }
    }
    return null;
  }

  mostrarCookie(nombre: string): void {
    if (!nombre) {
      this.resultado = 'El nombre de la cookie es obligatorio.';
      return;
    }
    const valor = this.getCookie(nombre);
    this.resultado = valor ? `Valor: ${valor}` : `No existe cookie con nombre "${nombre}".`;
  }

  deleteCookie(nombre: string): void {
    if (!nombre) {
      this.resultado = 'El nombre de la cookie es obligatorio.';
      return;
    }
    this.setCookie(nombre, "", -1);
    this.resultado = `Cookie "${nombre}" eliminada.`;
  }

  check(nombre: string): void {
    if (!nombre) {
      this.resultado = 'El nombre de la cookie es obligatorio.';
      return;
    }
    const existe = this.getCookie(nombre) !== null;
    this.resultado = existe ? `La cookie "${nombre}" existe.` : `La cookie "${nombre}" NO existe.`;
  }
}
