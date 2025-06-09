import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router  } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CarruselComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  encapsulation: ViewEncapsulation.None  // Desactiva el encapsulamiento
})
export class InicioComponent {
  mostrarBannerCookies = false;
    constructor(
    private router: Router,
    private auth: Auth,
  ) { }


     ngOnInit() {
    const consentimiento = localStorage.getItem('cookiesAceptadas');
    this.mostrarBannerCookies = consentimiento !== 'true' && consentimiento !== 'false';
  }

  aceptarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    this.mostrarBannerCookies = false;
  }

  rechazarCookies() {
    localStorage.setItem('cookiesAceptadas', 'false');
    this.mostrarBannerCookies = false;
  }

}
