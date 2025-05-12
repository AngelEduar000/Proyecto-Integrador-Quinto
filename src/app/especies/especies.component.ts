import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecieService, Especie } from '../servicios/especie.service';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent implements OnInit {
  busqueda: string = '';
  filtroUso: string = '';
  filtroRegion: string = ''; // aunque no lo uses, lo puedes dejar

  especies: Especie[] = [];
  private especieService = inject(EspecieService);

  ngOnInit(): void {
    this.especieService.obtenerEspecies().subscribe(data => {
      this.especies = data;
    });
  }

  get usosDisponibles() {
    return [...new Set(this.especies.map(e => e.uso))];
  }

  get regionesDisponibles() {
  return [...new Set(this.especies.map(e => e.region?.trim()))];
}


  especiesFiltradas() {
  const texto = this.busqueda.toLowerCase();

  return this.especies.filter(especie => {
    const coincideTexto =
      especie.nombre_comun.toLowerCase().includes(texto) ||
      especie.uso.toLowerCase().includes(texto);

    const coincideUso = !this.filtroUso || especie.uso === this.filtroUso;

    const coincideRegion = !this.filtroRegion || especie.region?.trim() === this.filtroRegion;

    return coincideTexto && coincideUso && coincideRegion;
  });
}

  imagenEspecie(nombre: string): string {
    return this.especieService.obtenerImagen(nombre);
  }
}
