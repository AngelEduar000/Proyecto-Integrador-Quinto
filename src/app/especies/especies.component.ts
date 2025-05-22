import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router'; // 👈 Agrega esto
import { filter } from 'rxjs/operators'; // 👈 Agrega esto
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
  busqueda: string = '';
  filtroUso: string = '';
  filtroRegion: string = '';

  usosDisponibles: string[] = [];
  regionesDisponibles: string[] = [];

  constructor(private especieService: EspecieService, private router: Router) {} // 👈 inyecta Router

  ngOnInit(): void {
    this.cargarEspecies();

    // 👇 Se suscribe a la navegación para recargar si vuelves a esta ruta
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
    });
  }

  especiesFiltradas(): Especie[] {
    return this.especies.filter(especie => {
      const coincideBusqueda =
        this.busqueda.trim() === '' ||
        especie.nombre_comun.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        especie.uso.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideUso = this.filtroUso === '' || especie.uso === this.filtroUso;
      const coincideRegion = this.filtroRegion === '' || especie.region.includes(this.filtroRegion);

      return coincideBusqueda && coincideUso && coincideRegion;
    });
  }

  imagenEspecie(nombreComun: string): string {
    return this.especieService.obtenerImagen(nombreComun);
  }
}
