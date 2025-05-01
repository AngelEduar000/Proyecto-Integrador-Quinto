import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  encapsulation: ViewEncapsulation.None  // Desactiva el encapsulamiento
})
export class InicioComponent {

}
