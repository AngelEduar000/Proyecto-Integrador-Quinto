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
      // imagen: 'Guayacán'
    },
    {
      nombre_comun: 'Ceiba',
      nombre_cientifico: 'Ceiba pentandra',
      usos_medicinales: 'Usada como analgésico.',
      territorios: ['Caribe', 'Pacífico'],
      // imagen: 'ceiba.jpg'
    },
    {
      nombre_comun: 'Sangre de Drago',
      nombre_cientifico: 'Croton lechleri',
      usos_medicinales: 'Antiinflamatorio natural y cicatrizante.',
      territorios: ['Amazonas'],
      // imagen: 'sangre-de-drago.jpg'
    },
    // Nuevas especies agregadas
    {
      nombre_comun: 'Cocora',
      nombre_cientifico: 'Ceroxylon quindiuense',
      usos_medicinales: 'El jugo de la cocora se utiliza para el tratamiento de enfermedades respiratorias.',
      territorios: ['Eje Cafetero'],
      // imagen: 'cocora.jpg'
    },
    {
      nombre_comun: 'Chuchuhuasi',
      nombre_cientifico: 'Maytenus krukovii',
      usos_medicinales: 'Se utiliza como tónico energético y para aliviar dolores musculares.',
      territorios: ['Amazonas', 'Orinoquía'],
      // imagen: 'chuchuhuasi.jpg'
    },
    {
      nombre_comun: 'Cedro',
      nombre_cientifico: 'Cedrela odorata',
      usos_medicinales: 'Uso en medicina tradicional para dolores de estómago y fiebre.',
      territorios: ['Pacífico', 'Amazonas'],
      // imagen: 'cedro.jpg'
    },
    {
      nombre_comun: 'Balsa',
      nombre_cientifico: 'Ochroma pyramidale',
      usos_medicinales: 'Se utiliza en la medicina tradicional para tratar heridas y quemaduras.',
      territorios: ['Pacífico'],
      // imagen: 'balsa.jpg'
    },
    {
      nombre_comun: 'Gualanday',
      nombre_cientifico: 'Tocoyena formosa',
      usos_medicinales: 'Se utiliza para tratar el dolor de cabeza y resfriados.',
      territorios: ['Amazonas', 'Orinoquía'],
      // imagen: 'gualanday.jpg'
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
