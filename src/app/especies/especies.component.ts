import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EspecieService, Especie } from '../servicios/especie.service';

@Component({
  selector: 'app-especies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent implements OnInit {
  especies: Especie[] = [];
  busqueda: string = '';           // búsqueda por texto (uso medicinal)
  filtroNombresComunes: string[] = []; // arreglo para varias especies seleccionadas
  filtroUso: string = '';
  filtroRegion: string = '';

  nombresComunesDisponibles: string[] = [];
  usosDisponibles: string[] = [];
  regionesDisponibles: string[] = [];

  constructor(private especieService: EspecieService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEspecies();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarEspecies();
      });
  }

  cargarEspecies(): void {
    this.especieService.obtenerEspecies().subscribe((datos) => {
      this.especies = datos;

      this.usosDisponibles = [
        ...new Set(
          this.especies
            .map(e => e.uso)
            .filter(Boolean)
            .flatMap(uso => uso.split(',').map(u => u.trim()))
        )
      ];

      this.regionesDisponibles = [
        ...new Set(this.especies.flatMap(e => e.region).filter(Boolean))
      ];

      this.nombresComunesDisponibles = [
        ...new Set(this.especies.map(e => e.nombre_comun).filter(Boolean))
      ];
    });
  }

  toggleNombreComunSeleccionado(nombre: string): void {
    const index = this.filtroNombresComunes.indexOf(nombre);
    if (index === -1) {
      this.filtroNombresComunes.push(nombre);
    } else {
      this.filtroNombresComunes.splice(index, 1);
    }
  }

  especiesFiltradas(): Especie[] {
    return this.especies.filter(especie => {
      const coincideBusqueda =
        this.busqueda.trim() === '' ||
        especie.uso.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideNombreComun =
        this.filtroNombresComunes.length === 0 ||
        this.filtroNombresComunes.includes(especie.nombre_comun);

      const coincideUso = this.filtroUso === '' || especie.uso === this.filtroUso;

      const coincideRegion =
        this.filtroRegion === '' || especie.region.includes(this.filtroRegion);

      return coincideBusqueda && coincideNombreComun && coincideUso && coincideRegion;
    });
  }

  imagenEspecie(nombreComun: string): string {
    return this.especieService.obtenerImagen(nombreComun);
  }
}
