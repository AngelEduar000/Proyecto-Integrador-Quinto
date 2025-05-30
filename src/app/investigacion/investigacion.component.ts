import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Conglomerado {
  id: string;
  nombre: string;
}

interface Subparcela {
  id: string;
  nombre: string;
  id_conglomerado: string;
}

interface Especie {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-investigacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investigacion.component.html',
  styleUrls: ['./investigacion.component.css']
})
export class InvestigacionComponent {
  conglomerados: Conglomerado[] = [
    { id: 'c1', nombre: 'Conglomerado A' },
    { id: 'c2', nombre: 'Conglomerado B' }
  ];

  subparcelas: Subparcela[] = [
    { id: 's1', nombre: 'Subparcela 1', id_conglomerado: 'c1' },
    { id: 's2', nombre: 'Subparcela 2', id_conglomerado: 'c1' },
    { id: 's3', nombre: 'Subparcela 3', id_conglomerado: 'c2' }
  ];

  especies: Especie[] = [
    { id: 'e1', nombre: 'Especie X' },
    { id: 'e2', nombre: 'Especie Y' },
    { id: 'e3', nombre: 'Especie Z' }
  ];

  subparcelasFiltradas: Subparcela[] = [];

  // Declaración correcta para evitar error TS2339
  muestrasGuardadas: any[] = [];

  nuevaMuestra = {
    id_conglomerado: '',
    id_subparcela: '',
    distancia_x: null as number | null,
    distancia_y: null as number | null,
    especie: '',  // Opcional
    altura_mt: null as number | null,
    diametro_cm: null as number | null,
    observaciones: '',
    tipo_muestra: '',
    fecha_recoleccion: this.fechaHoy(),
    nombre_local: '',
    imagen: null as File | null
  };

  cargarSubparcelas() {
    if (this.nuevaMuestra.id_conglomerado) {
      this.subparcelasFiltradas = this.subparcelas.filter(
        sp => sp.id_conglomerado === this.nuevaMuestra.id_conglomerado
      );
      this.nuevaMuestra.id_subparcela = '';
    } else {
      this.subparcelasFiltradas = [];
      this.nuevaMuestra.id_subparcela = '';
    }
  }

  onImagenSeleccionada(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.nuevaMuestra.imagen = file;
    }
  }

  fechaHoy(): string {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dd = hoy.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  guardarMuestra() {
    if (!this.nuevaMuestra.id_conglomerado) {
      alert('Debe seleccionar un conglomerado.');
      return;
    }
    if (!this.nuevaMuestra.id_subparcela) {
      alert('Debe seleccionar una subparcela.');
      return;
    }
    if (this.nuevaMuestra.distancia_x === null || this.nuevaMuestra.distancia_y === null) {
      alert('Debe ingresar las distancias desde el centro de la subparcela.');
      return;
    }
    if (this.nuevaMuestra.altura_mt === null || this.nuevaMuestra.altura_mt < 0) {
      alert('Debe ingresar una altura válida.');
      return;
    }
    if (this.nuevaMuestra.diametro_cm === null || this.nuevaMuestra.diametro_cm < 0) {
      alert('Debe ingresar un diámetro válido.');
      return;
    }
    if (!this.nuevaMuestra.tipo_muestra) {
      alert('Debe seleccionar un tipo de muestra.');
      return;
    }
    if (!this.nuevaMuestra.fecha_recoleccion) {
      alert('Debe ingresar la fecha de recolección.');
      return;
    }

    // Guarda la muestra en el array local
    this.muestrasGuardadas.push({ ...this.nuevaMuestra });

    alert('Muestra registrada correctamente.');

    // Limpiar el formulario y resetear valores
    this.nuevaMuestra = {
      id_conglomerado: '',
      id_subparcela: '',
      distancia_x: null,
      distancia_y: null,
      especie: '',
      altura_mt: null,
      diametro_cm: null,
      observaciones: '',
      tipo_muestra: '',
      fecha_recoleccion: this.fechaHoy(),
      nombre_local: '',
      imagen: null
    };

    this.subparcelasFiltradas = [];
  }
}
