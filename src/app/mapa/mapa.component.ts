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

  // Radio general de 80 metros para todos los conglomerados
  radioGeneral = 80; // Radio en metros

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
        console.warn(`❗ Coordenadas inválidas para el conglomerado: ${conglomerado.identificador}`);
        return;
      }

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: conglomerado.identificador,
        animation: google.maps.Animation.DROP  // Añadir animación al marcador (cae desde arriba)
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
    console.log('Municipio:', conglomerado.municipio);  // Para verificar si se recibe correctamente el municipio
    console.log('Fecha de Creación:', conglomerado.fecha_creacion);  // Verifica si la fecha está presente
    
    // Actualizar los datos en el panel
    document.getElementById('zona-nombre')!.innerText = conglomerado.identificador;
    document.getElementById('zona-radio')!.innerText = `${this.radioGeneral} m`; // Mostrar el radio general
    document.getElementById('zona-region')!.innerText = conglomerado.region || '-';  // Mostrar la región
    document.getElementById('zona-municipio')!.innerText = conglomerado.municipio || '-';  // Mostrar el municipio
    document.getElementById('zona-fecha-creacion')!.innerText = conglomerado.fecha_creacion || '-';  // Mostrar la fecha de creación
    
    const especiesLista = document.getElementById('especies-lista')!;
    especiesLista.innerHTML = ''; // Limpiar lista existente
    conglomerado.especies.forEach((especie: string) => {
      const li = document.createElement('li');
      li.innerText = especie;
      especiesLista.appendChild(li);
    });
  }

  // Función para hacer zoom al conglomerado y mostrar el círculo del radio con animación gradual
  zoomToConglomerado(marker: any, conglomerado: any): void {
    // Primero, hacer zoom en el marcador
    this.map.setCenter(marker.getPosition());

    // Inicializar el nivel de zoom
    let startZoom = this.map.getZoom();  // Cambiar const a let para permitir la modificación
    const targetZoom = 16;  // Ajusta el nivel de zoom más alto al valor deseado
    const zoomStep = 1;  // Define el incremento del zoom
    const intervalTime = 90;  // Intervalo en milisegundos entre los aumentos de zoom

    // Animación gradual para aumentar el zoom
    const zoomInterval = setInterval(() => {
      if (startZoom < targetZoom) {
        this.map.setZoom(startZoom + zoomStep);  // Aumenta el zoom
        startZoom++;
      } else {
        clearInterval(zoomInterval);  // Detener el zoom cuando alcanza el nivel objetivo
      }
    }, intervalTime);

    // Si ya existe un círculo, lo elimina
    if (this.circle) {
      this.circle.setMap(null);
    }

    // Crear un círculo alrededor del conglomerado con el radio especificado
    const radio = this.radioGeneral; // Usamos el radio general de 80 metros
    this.circle = new google.maps.Circle({
      map: this.map,
      center: marker.getPosition(),
      radius: radio, // Radio en metros
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    // Desplazamiento suave hacia el marcador
    this.map.panTo(marker.getPosition());  // Animación suave para mover el centro del mapa
  }
}
