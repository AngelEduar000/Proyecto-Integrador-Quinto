import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Muestra {
  codigo_referencia: string;
  conglomerado_nombre: string;
  subparcela_nombre: string;
  distancia_x: number;
  distancia_y: number;
  tipo_muestra: string;
  nombre_local?: string;
  especie_id?: number;
}

interface Especie {
  id: number;
  nombre_cientifico: string;
  usos?: string;
  observaciones?: string;
}

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent {
  codigoBusqueda: string = '';
  muestra: Muestra | null = null;

  especies: Especie[] = [
    { id: 1, nombre_cientifico: 'Pinus sylvestris', usos: 'Construcción', observaciones: 'Conífera común' },
    { id: 2, nombre_cientifico: 'Quercus robur', usos: 'Madera', observaciones: '' }
  ];

  especieSeleccionadaId: number | null = null;
  especieEdit: Especie = { id: 0, nombre_cientifico: '', usos: '', observaciones: '' };

  creandoNuevaEspecie: boolean = false;
  nuevaEspecie: Especie = { id: 0, nombre_cientifico: '', usos: '', observaciones: '' };

  muestrasSimuladas: Muestra[] = [
    {
      codigo_referencia: 'C1-S1-20230501-001',
      conglomerado_nombre: 'Conglomerado A',
      subparcela_nombre: 'Subparcela 1',
      distancia_x: 5.2,
      distancia_y: -3.1,
      tipo_muestra: 'hoja',
      nombre_local: 'Pino',
      especie_id: 1
    }
  ];

  buscarMuestra() {
    if (!this.codigoBusqueda.trim()) {
      alert('Por favor ingrese un código de referencia para buscar.');
      return;
    }

    const encontrada = this.muestrasSimuladas.find(
      m => m.codigo_referencia.toLowerCase() === this.codigoBusqueda.trim().toLowerCase()
    );

    if (!encontrada) {
      alert('No se encontró ninguna muestra con ese código.');
      this.muestra = null;
      this.especieSeleccionadaId = null;
      this.creandoNuevaEspecie = false;
      return;
    }

    this.muestra = encontrada;
    this.especieSeleccionadaId = encontrada.especie_id || null;
    this.creandoNuevaEspecie = false;

    if (this.especieSeleccionadaId) {
      this.cargarDatosEspecie();
    } else {
      this.especieEdit = { id: 0, nombre_cientifico: '', usos: '', observaciones: '' };
    }
  }

  cargarDatosEspecie() {
    if (!this.especieSeleccionadaId) return;

    const esp = this.especies.find(e => e.id === this.especieSeleccionadaId);
    if (esp) {
      this.especieEdit = { ...esp };
    }
  }

  guardarEspecie() {
    if (!this.especieEdit.nombre_cientifico.trim()) {
      alert('El nombre científico es obligatorio.');
      return;
    }

    const index = this.especies.findIndex(e => e.id === this.especieEdit.id);
    if (index >= 0) {
      this.especies[index] = { ...this.especieEdit };
      alert('Especie actualizada correctamente.');
    }
  }

  mostrarFormularioNuevaEspecie() {
    this.creandoNuevaEspecie = true;
    this.nuevaEspecie = { id: 0, nombre_cientifico: '', usos: '', observaciones: '' };
  }

  guardarNuevaEspecie() {
    if (!this.nuevaEspecie.nombre_cientifico.trim()) {
      alert('El nombre científico es obligatorio.');
      return;
    }

    const nuevoId = this.especies.length > 0 ? Math.max(...this.especies.map(e => e.id)) + 1 : 1;
    this.nuevaEspecie.id = nuevoId;

    this.especies.push({ ...this.nuevaEspecie });
    alert('Nueva especie creada correctamente.');

    this.creandoNuevaEspecie = false;

    this.especieSeleccionadaId = nuevoId;
    this.cargarDatosEspecie();
  }

  cancelarCrearEspecie() {
    this.creandoNuevaEspecie = false;
  }
}
