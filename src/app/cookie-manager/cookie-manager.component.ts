import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookie-manager',
  templateUrl: './cookie-manager.component.html',
  styleUrls: ['./cookie-manager.component.css'],
  imports:[FormsModule]
})
export class CookieManagerComponent {
  cookieName: string = '';
  cookieValue: string = '';
  cookieInfo: string = '';

  constructor(private cookieService: CookieService) {}

  setCookie() {
    if(this.cookieName && this.cookieValue) {
      this.cookieService.set(this.cookieName, this.cookieValue, 7); // 7 días de duración
      this.cookieInfo = `Cookie "${this.cookieName}" guardada con valor "${this.cookieValue}".`;
    }
  }

  getCookie() {
    if(this.cookieName) {
      const value = this.cookieService.get(this.cookieName);
      this.cookieInfo = value ? `Cookie "${this.cookieName}" tiene valor: "${value}".` : `Cookie "${this.cookieName}" no encontrada.`;
    }
  }

  deleteCookie() {
    if(this.cookieName) {
      this.cookieService.delete(this.cookieName);
      this.cookieInfo = `Cookie "${this.cookieName}" eliminada.`;
    }
  }
}
