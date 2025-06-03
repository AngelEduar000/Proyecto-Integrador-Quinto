export class CookieManagerComponent {
  nombre: string = '';
  valor: string = '';
  dias: number = 1;
  resultado: string = '';

  constructor() {}

  setCookie(nombre: string, valor: string, dias: number): void {
    const fechaExp = new Date();
    fechaExp.setTime(fechaExp.getTime() + dias * 24 * 60 * 60 * 1000);
    const expira = 'expires=' + fechaExp.toUTCString();
    document.cookie = `${nombre}=${valor};${expira};path=/`;
    this.resultado = `Cookie "${nombre}" guardada`;
  }

  getCookie(nombre: string): string | null {
    const nombreEQ = nombre + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(nombreEQ) === 0) {
        return c.substring(nombreEQ.length);
      }
    }
    return null;
  }

  deleteCookie(nombre: string): void {
    this.setCookie(nombre, '', -1);
    this.resultado = `Cookie "${nombre}" eliminada`;
  }

  checkCookie(nombre: string): boolean {
    return this.getCookie(nombre) !== null;
  }

  mostrarCookie(nombre: string): void {
    const valor = this.getCookie(nombre);
    this.resultado = valor
      ? `Valor de "${nombre}": ${valor}`
      : `La cookie "${nombre}" no existe`;
  }

  check(nombre: string): void {
    this.resultado = this.checkCookie(nombre)
      ? `La cookie "${nombre}" existe`
      : `La cookie "${nombre}" no existe`;
  }
}
