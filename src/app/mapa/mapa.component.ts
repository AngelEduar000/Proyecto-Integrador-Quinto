import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DataService } from '../servicios/data.service';
import { take } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  conglomerados: any[] = [];
  markers: any[] = [];
  map: any;
  circle: any;
  regiones: string[] = [];
  radioGeneral = 110;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsScript().then(() => {
        this.dataService.getConglomerados().pipe(take(1)).subscribe({
          next: (data) => {
            console.log('✅ Datos de conglomerados cargados:', data);
            this.conglomerados = data;
            this.regiones = this.extractRegions(data);
            this.initMap();
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

  extractRegions(data: any[]): string[] {
    const regionesUnicas = new Set(data.map((item) => item.region));
    return Array.from(regionesUnicas);
  }

  filterByRegion(region: string): void {
    this.clearMarkers();
    const filteredConglomerados = region ? this.conglomerados.filter(c => c.region === region) : this.conglomerados;

    filteredConglomerados.forEach((conglomerado) => {
      const [lat, lng] = conglomerado.coordenadas;

      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`❗ Coordenadas inválidas para el conglomerado: ${conglomerado.identificador}`);
        return;
      }

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: conglomerado.identificador,
        animation: google.maps.Animation.DROP
      });

      marker.addListener("click", () => {
        this.updateInfoPanel(conglomerado);
        this.zoomToConglomerado(marker, conglomerado);
      });

      this.markers.push(marker);
    });
  }

  updateInfoPanel(conglomerado: any): void {
    document.getElementById('zona-nombre')!.innerText = conglomerado.identificador;
    document.getElementById('zona-radio')!.innerText = `${this.radioGeneral} m`;
    document.getElementById('zona-region')!.innerText = conglomerado.region || '-';
    document.getElementById('zona-municipio')!.innerText = conglomerado.municipio || '-';
    document.getElementById('zona-fecha-creacion')!.innerText = conglomerado.fecha_creacion || '-';

    // Si tienes un contenedor para especies, puedes dejarlo vacío o no tocarlo
    const especiesLista = document.getElementById('especies-lista');
    if (especiesLista) {
      especiesLista.innerHTML = '';  // Limpiar por si acaso, pero no mostrar nada
    }
  }

  zoomToConglomerado(marker: any, conglomerado: any): void {
    this.map.setCenter(marker.getPosition());
    let startZoom = this.map.getZoom();
    const targetZoom = 16;
    const zoomStep = 0.2;
    const intervalTime = 50;

    const zoomInterval = setInterval(() => {
      if (startZoom < targetZoom) {
        this.map.setZoom(startZoom);
        startZoom += zoomStep;
      } else {
        clearInterval(zoomInterval);
      }
    }, intervalTime);

    if (this.circle) {
      this.circle.setMap(null);
    }

    const radio = this.radioGeneral;
    this.circle = new google.maps.Circle({
      map: this.map,
      center: marker.getPosition(),
      radius: radio,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    this.map.panTo(marker.getPosition());
  }

  clearMarkers(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  onRegionChange(event: any): void {
    const selectedRegion = event.target.value;
    this.filterByRegion(selectedRegion);
  }

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
        resolve();
      }
    });
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 5.5,
      center: { lat: 4.60971, lng: -74.08175 },
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    this.filterByRegion('');
  }
}
