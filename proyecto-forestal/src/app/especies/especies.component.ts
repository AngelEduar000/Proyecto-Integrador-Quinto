import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent {
  busqueda: string = '';
  filtroUso: string = '';
  filtroTerritorio: string = '';

  especies = [
    {
      nombre_comun: 'Guayacán',
      nombre_cientifico: 'Tabebuia chrysantha',
      usos_medicinales: 'Tratamiento de fiebres y dolores.',
      territorios: ['Amazonas', 'Chocó'],
      imagen: 'guayacan.jpg'
    },
    {
      nombre_comun: 'Ceiba',
      nombre_cientifico: 'Ceiba pentandra',
      usos_medicinales: 'Usada como analgésico.',
      territorios: ['Caribe', 'Pacífico'],
      imagen: 'ceiba.jpg'
    },
    {
      nombre_comun: 'Sangre de Drago',
      nombre_cientifico: 'Croton lechleri',
      usos_medicinales: 'Antiinflamatorio natural y cicatrizante.',
      territorios: ['Amazonas'],
      imagen: 'sangre-de-drago.jpg'
    }
  ];

  get usosDisponibles() {
    return [...new Set(this.especies.map(e => e.usos_medicinales))];
  }

  get territoriosDisponibles() {
    return [...new Set(this.especies.flatMap(e => e.territorios || []))];
  }

  especiesFiltradas() {
    const texto = this.busqueda.toLowerCase();

    return this.especies.filter(especie => {
      const coincideTexto =
        especie.nombre_comun.toLowerCase().includes(texto) ||
        especie.usos_medicinales.toLowerCase().includes(texto);

      const coincideUso = !this.filtroUso || especie.usos_medicinales === this.filtroUso;

      const coincideTerritorio = !this.filtroTerritorio ||
        especie.territorios.includes(this.filtroTerritorio);

      return coincideTexto && coincideUso && coincideTerritorio;
    });
  }
}
