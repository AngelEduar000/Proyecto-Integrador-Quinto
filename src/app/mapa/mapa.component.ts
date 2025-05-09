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
  map: any;
  circle: any;

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
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2A5gNXoB8-TYjCQJF7o9oEa3_B_EufKk&callback';
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
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
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
        map: this.map,
        title: conglomerado.nombre
      });

      // Añadir listener de clic para actualizar el panel de información y hacer zoom
      marker.addListener("click", () => {
        this.updateInfoPanel(conglomerado);
        this.zoomToConglomerado(marker, conglomerado);
      });
    });
  }

  // Función para actualizar el panel de información
  updateInfoPanel(conglomerado: any): void {
    document.getElementById('zona-nombre')!.innerText = conglomerado.nombre;
    document.getElementById('zona-radio')!.innerText = conglomerado.radio || '-';
    document.getElementById('zona-ubicacion')!.innerText = conglomerado.ubicacion || '-';
    
    const especiesLista = document.getElementById('especies-lista')!;
    especiesLista.innerHTML = ''; // Limpiar lista existente
    conglomerado.especies.forEach((especie: string) => {
      const li = document.createElement('li');
      li.innerText = especie;
      especiesLista.appendChild(li);
    });
    
    document.getElementById('zona-acceso')!.innerText = conglomerado.acceso || '-';
  }

  // Función para hacer zoom al conglomerado y mostrar el círculo del radio
  zoomToConglomerado(marker: any, conglomerado: any): void {
    // Primero, hacer zoom en el marcador
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(12); // Ajusta el nivel de zoom a lo que desees

    // Si ya existe un círculo, lo elimina
    if (this.circle) {
      this.circle.setMap(null);
    }

    // Crear un círculo alrededor del conglomerado con el radio especificado
    const radio = conglomerado.radio || 0; // Radio en kilómetros
    this.circle = new google.maps.Circle({
      map: this.map,
      center: marker.getPosition(),
      radius: radio * 1000, // Convertir el radio a metros
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });
  }
}
