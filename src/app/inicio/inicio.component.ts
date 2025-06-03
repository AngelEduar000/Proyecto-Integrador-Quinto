import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { CookieManagerComponent } from '../cookie-manager/cookie-manager.component';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CarruselComponent, CookieManagerComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  encapsulation: ViewEncapsulation.None  // Desactiva el encapsulamiento
})
export class InicioComponent {

}
