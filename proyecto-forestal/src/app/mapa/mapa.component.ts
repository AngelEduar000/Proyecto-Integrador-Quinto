import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet'); // ✅ carga solo JS, no CSS

      const map = L.map('map').setView([4.5709, -74.2973], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const marker = L.marker([4.65, -74.05]).addTo(map);
      marker.bindPopup('Conglomerado: Zona Andina').openPopup();

      marker.on('click', () => this.mostrarInfo());
    }
  }

  mostrarInfo() {
    const zona = document.getElementById('zona-nombre');
    const radio = document.getElementById('zona-radio');
    const ubicacion = document.getElementById('zona-ubicacion');
    const acceso = document.getElementById('zona-acceso');
    const lista = document.getElementById('especies-lista');

    if (zona && radio && ubicacion && acceso && lista) {
      zona.textContent = 'Zona Andina';
      radio.textContent = '3.2';
      ubicacion.textContent = 'Bogotá, Cundinamarca';
      acceso.textContent = 'Media';
      lista.innerHTML = `
        <li>Quercus humboldtii</li>
        <li>Cedrela odorata</li>
        <li>Tabebuia rosea</li>
      `;
    }
  }
}
