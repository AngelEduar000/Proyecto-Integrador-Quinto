import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { take } from 'rxjs';

declare var google: any; // Declarar google para evitar el error de "google is not defined"

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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar el script de Google Maps dinámicamente
      this.loadGoogleMapsScript().then(() => {
        // Después de cargar el script, cargar los datos
        this.dataService.getConglomerados().pipe(take(1)).subscribe({
          next: (data) => {
            console.log('✅ Datos de conglomerados cargados:', data);
            this.conglomerados = data;
            this.initMap(); // Inicializar el mapa
          },
          error: (err) => {
            console.error('Error al cargar los datos', err);
          }
        });
      }).catch((error) => {
        console.error('Error al cargar la API de Google Maps:', error);
      });
    }
  }

  // Función para cargar el script de Google Maps
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2A5gNXoB8-TYjCQJF7o9oEa3_B_EufKk&callback'; // ❌ Quita el &callback=initMap
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject('No se pudo cargar el script de Google Maps');
        document.head.appendChild(script);
      } else {
        resolve(); // Ya está cargado
      }
    });
  }


  // Función para inicializar el mapa
  initMap(): void {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 5.5,
      center: { lat: 4.60971, lng: -74.08175 } // Bogotá como punto central
    });

    this.conglomerados.forEach((conglomerado) => {
      const [latStr, lngStr] = conglomerado.coordenadas;
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`❗ Coordenadas inválidas para el conglomerado: ${conglomerado.nombre}`);
        return;
      }

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: conglomerado.nombre
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${conglomerado.nombre}</h3>
            <p><strong>Ubicación:</strong> ${conglomerado.ubicacion}</p>
            <p><strong>Especies encontradas:</strong> ${conglomerado.especies.join(', ')}</p>
            <p><strong>Dificultad de acceso:</strong> ${conglomerado.acceso}</p>
          </div>
        `
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }

}
