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
  filtroRegion: string = '';
  especies: Especie[] = [];
  cargando: boolean = true;

  private especieService = inject(EspecieService);

  ngOnInit(): void {
    this.especieService.obtenerEspecies().subscribe({
      next: (data) => {
        this.especies = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar especies:', err);
        this.cargando = false;
      }
    });
  }

  get usosDisponibles() {
    return [...new Set(this.especies.map(e => e.uso))];
  }

  get regionesDisponibles() {
    const regionesSeparadas = this.especies.flatMap(e =>
      e.region?.split(',').map(r => r.trim()) || []
    );
    return [...new Set(regionesSeparadas)].sort();
  }

  especiesFiltradas() {
    const texto = this.busqueda.toLowerCase();

    return this.especies.filter(especie => {
      const coincideTexto =
        especie.nombre_comun.toLowerCase().includes(texto) ||
        especie.uso.toLowerCase().includes(texto);

      const coincideUso = !this.filtroUso || especie.uso === this.filtroUso;

      const coincideRegion = !this.filtroRegion ||
        especie.region?.split(',').map(r => r.trim()).includes(this.filtroRegion);

      return coincideTexto && coincideUso && coincideRegion;
    });
  }

  imagenEspecie(nombre: string): string {
    return this.especieService.obtenerImagen(nombre);
  }
}
