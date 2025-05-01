import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ideam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ideam.component.html',
  styleUrls: ['./ideam.component.css']
})
export class IdeamComponent {
  liderBrigada = '';
  conglomeradoGenerado: string[] = [];

  generarConglomerado() {
    this.conglomeradoGenerado = ['Parcelas: P1, P2, P3', 'Zonas altas', 'Acceso vía terrestre', 'Duración estimada: 3 días'];
  }

  asignarLider() {
    alert(`Líder asignado: ${this.liderBrigada}`);
  }
}
