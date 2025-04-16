import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent {
  codigoBusqueda: string = '';
  muestra: any = null;

  resultado = {
    nombreCientifico: '',
    usos: '',
    observaciones: ''
  };

  // Simulación de datos que vendrían del investigador
  muestrasDisponibles = [
    {
      codigoReferencia: 'ABC123',
      parcela: 'P1',
      subparcela: 'S1',
      ubicacion: 'Norte',
      nombreLocal: 'Chilco'
    },
    {
      codigoReferencia: 'DEF456',
      parcela: 'P2',
      subparcela: 'S3',
      ubicacion: 'Este',
      nombreLocal: 'Guayacán'
    }
  ];

  buscarMuestra() {
    this.muestra = this.muestrasDisponibles.find(
      m => m.codigoReferencia.toLowerCase() === this.codigoBusqueda.trim().toLowerCase()
    );

    if (!this.muestra) {
      alert('No se encontró ninguna muestra con ese código.');
    }
  }

  guardarResultado() {
    console.log('Resultado registrado:', {
      ...this.muestra,
      ...this.resultado
    });

    alert(`Resultado guardado para código ${this.muestra.codigoReferencia}`);
    this.resetFormulario();
  }

  resetFormulario() {
    this.codigoBusqueda = '';
    this.muestra = null;
    this.resultado = {
      nombreCientifico: '',
      usos: '',
      observaciones: ''
    };
  }
}
