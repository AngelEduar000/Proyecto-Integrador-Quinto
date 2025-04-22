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

  // Información de los conglomerados dentro de Colombia
  conglomerados = [
    {
      nombre: 'Zona Andina',
      lat: 4.65, // Bogotá, Cundinamarca
      lon: -74.05,
      radio: 3.2,
      ubicacion: 'Bogotá, Cundinamarca',
      acceso: 'Media',
      especies: [
        'Quercus humboldtii',
        'Cedrela odorata',
        'Tabebuia rosea'
      ]
    },
    {
      nombre: 'Zona Caribe',
      lat: 10.5, // Cartagena, Bolívar
      lon: -75.5,
      radio: 2.5,
      ubicacion: 'Cartagena, Bolívar',
      acceso: 'Alta',
      especies: [
        'Mangifera indica',
        'Cocos nucifera',
        'Theobroma cacao'
      ]
    },
    {
      nombre: 'Zona Amazonas',
      lat: -3.5, // Leticia, Amazonas
      lon: -69.5,
      radio: 5.0,
      ubicacion: 'Leticia, Amazonas',
      acceso: 'Baja',
      especies: [
        'Carapa guianensis',
        'Cedrela odorata',
        'Ficus gomelleira'
      ]
    },
    {
      nombre: 'Zona Pacífica',
      lat: 3.9, // Buenaventura, Valle del Cauca
      lon: -77.05,
      radio: 4.0,
      ubicacion: 'Buenaventura, Valle del Cauca',
      acceso: 'Baja',
      especies: [
        'Balsa',
        'Ficus insipida',
        'Guatteria'
      ]
    },
    {
      nombre: 'Zona Orinoquía',
      lat: 4.15, // Villavicencio, Meta
      lon: -73.65,
      radio: 3.5,
      ubicacion: 'Villavicencio, Meta',
      acceso: 'Media',
      especies: [
        'Mauritia flexuosa',
        'Erythrina fusca',
        'Piper angustifolium'
      ]
    },
    {
      nombre: 'Zona Llanos',
      lat: 5.25, // Yopal, Casanare
      lon: -72.39,
      radio: 3.0,
      ubicacion: 'Yopal, Casanare',
      acceso: 'Media',
      especies: [
        'Bertholletia excelsa',
        'Vochysia guatemalensis',
        'Astrocaryum chambira'
      ]
    },
    {
      nombre: 'Zona Eje Cafetero',
      lat: 4.54, // Armenia, Quindío
      lon: -75.68,
      radio: 3.0,
      ubicacion: 'Armenia, Quindío',
      acceso: 'Alta',
      especies: [
        'Coffea arabica',
        'Pinus patula',
        'Quercus humboldtii'
      ]
    },
    {
      nombre: 'Zona Santanderes',
      lat: 7.12, // Bucaramanga, Santander
      lon: -73.12,
      radio: 3.5,
      ubicacion: 'Bucaramanga, Santander',
      acceso: 'Alta',
      especies: [
        'Cedrela odorata',
        'Swietenia macrophylla',
        'Laurelia sempervirens'
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet'); // ✅ carga solo JS, no CSS

      const map = L.map('map').setView([4.5709, -74.2973], 6); // Vista inicial centrada en Colombia

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Añadir todos los marcadores del array de conglomerados
      this.conglomerados.forEach(conglomerado => {
        const marker = L.marker([conglomerado.lat, conglomerado.lon]).addTo(map);
        marker.bindPopup(conglomerado.nombre);

        marker.on('click', () => this.mostrarInfo(conglomerado));
      });
    }
  }

  // Mostrar la información del conglomerado seleccionado
  mostrarInfo(conglomerado: any) {
    const zona = document.getElementById('zona-nombre');
    const radio = document.getElementById('zona-radio');
    const ubicacion = document.getElementById('zona-ubicacion');
    const acceso = document.getElementById('zona-acceso');
    const lista = document.getElementById('especies-lista');

    if (zona && radio && ubicacion && acceso && lista) {
      zona.textContent = conglomerado.nombre;
      radio.textContent = conglomerado.radio.toString();
      ubicacion.textContent = conglomerado.ubicacion;
      acceso.textContent = conglomerado.acceso;
      lista.innerHTML = conglomerado.especies.map((especie: string) => `<li>${especie}</li>`).join('');
    }
  }
}
