import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CarruselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  encapsulation: ViewEncapsulation.None  // Desactiva el encapsulamiento
})
export class InicioComponent {

}
