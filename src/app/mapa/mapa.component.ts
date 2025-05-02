import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  conglomerados: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      console.log('✅ Leaflet cargado');

      this.dataService.getConglomerados().pipe(take(1)).subscribe({
        next: (data) => {
          if (!Array.isArray(data)) {
            console.error('❌ El valor recibido no es un arreglo:', data);
            return;
          }
          console.log('✅ Datos de conglomerados cargados:', data);
          this.conglomerados = data;
          this.inicializarMapa(L);
        },
        error: (err) => {
          console.error('❌ Error al cargar JSON:', err);
        }
      });
    }
  }

  inicializarMapa(L: any): void {
    const map = L.map('map').setView([4.5709, -74.2973], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.conglomerados.forEach(conglomerado => {
      const latlng = conglomerado.coordenadas ?? [conglomerado.lat, conglomerado.lon];

      if (!latlng || latlng.length !== 2) {
        console.warn('⚠️ Coordenadas inválidas para:', conglomerado);
        return;
      }

      const marker = L.marker(latlng, { icon: customIcon }).addTo(map);
      marker.bindPopup(conglomerado.nombre);
      marker.on('click', () => this.mostrarInfo(conglomerado));
    });
  }

  mostrarInfo(conglomerado: any): void {
    const zona = document.getElementById('zona-nombre');
    const radio = document.getElementById('zona-radio');
    const ubicacion = document.getElementById('zona-ubicacion');
    const acceso = document.getElementById('zona-acceso');
    const lista = document.getElementById('especies-lista');

    if (zona && radio && ubicacion && acceso && lista) {
      zona.textContent = conglomerado.nombre;
      radio.textContent = conglomerado.radio?.toString() ?? 'N/A';
      ubicacion.textContent = conglomerado.ubicacion ?? 'N/A';
      acceso.textContent = conglomerado.acceso ?? 'N/A';

      lista.innerHTML = Array.isArray(conglomerado.especies)
        ? conglomerado.especies.map((especie: string) => `<li>${especie}</li>`).join('')
        : '<li>No hay especies registradas</li>';
    }
  }
}
