import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investigacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investigacion.component.html',
  styleUrls: ['./investigacion.component.css']
})
export class InvestigacionComponent {
  nuevaMuestra = {
    parcela: '',
    subparcela: '',
    ubicacion: '',
    nombreLocal: '',
    codigoReferencia: '',
    imagen: null as File | null
  };

  muestrasGuardadas: any[] = [];

  onImagenSeleccionada(event: any) {
    this.nuevaMuestra.imagen = event.target.files[0];
  }

  guardarMuestra() {
    if (!this.nuevaMuestra.codigoReferencia) {
      alert('El código de referencia es obligatorio');
      return;
    }

    this.muestrasGuardadas.push({ ...this.nuevaMuestra });
    alert('Muestra registrada correctamente');

    // Limpiar el formulario
    this.nuevaMuestra = {
      parcela: '',
      subparcela: '',
      ubicacion: '',
      nombreLocal: '',
      codigoReferencia: '',
      imagen: null
    };
  }
}
