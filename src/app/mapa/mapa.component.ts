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
            this.initMap(); // Inicializar el mapa después de cargar la API
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

  // Función para cargar el script de Google Maps de manera dinámica
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2A5gNXoB8-TYjCQJF7o9oEa3_B_EufKk'; // No usar callback=initMap
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve();
          this.initMap();  // Llamar a initMap una vez que se cargue el script
        };
        script.onerror = () => reject('No se pudo cargar el script de Google Maps');
        document.head.appendChild(script);
      } else {
        resolve(); // Si Google ya está cargado, resolver la promesa
        this.initMap();
      }
    });
  }

  // Función para inicializar el mapa
  initMap(): void {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 5.5,
      center: { lat: 4.60971, lng: -74.08175 },  // Coordenadas de ejemplo (Bogotá)
    });

    // Añadir los marcadores usando las coordenadas de los conglomerados
    this.conglomerados.forEach(conglomerado => {
      const lat = parseFloat(conglomerado.coordenadas[0]);  // Accedemos al valor de latitud
      const lng = parseFloat(conglomerado.coordenadas[1]);  // Accedemos al valor de longitud

      // Comprobar si las coordenadas son válidas
      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          title: conglomerado.nombre
        });

        // Información adicional al hacer clic en el marcador
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <h3>${conglomerado.nombre}</h3>
            <p>Ubicación: ${conglomerado.ubicacion}</p>
            <p>Especies encontradas: ${conglomerado.especies.join(', ')}</p>
            <p>Dificultad de acceso: ${conglomerado.acceso}</p>
          `
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      } else {
        console.warn(`Coordenadas no válidas para el conglomerado ${conglomerado.nombre}`);
      }
    });
  }
}
