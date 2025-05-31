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

  // Restauramos las propiedades para el círculo principal y las subparcelas
  circle: any; // Para el círculo grande rojo
  subPlotCircles: any[] = []; // Para las 5 subparcelas celestes
  
  regiones: string[] = [];
  radioGeneral = 110; // Radio del conglomerado principal

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
      let lat: number, lng: number;
      if (Array.isArray(conglomerado.coordenadas)) {
        [lat, lng] = conglomerado.coordenadas;
      } else {
        [lat, lng] = conglomerado.coordenadas.split(',').map(Number);
      }

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

    const especiesLista = document.getElementById('especies-lista');
    if (especiesLista) {
      especiesLista.innerHTML = '';
    }
  }

  zoomToConglomerado(marker: any, conglomerado: any): void {
    this.map.panTo(marker.getPosition());

    // 1. RESTAURAMOS LA ANIMACIÓN DE ZOOM
    let startZoom = this.map.getZoom();
    const targetZoom = 18; // Acercamos lo suficiente para ver las subparcelas
    const zoomStep = 0.2;
    const intervalTime = 40; // Un poco más rápido

    const zoomInterval = setInterval(() => {
      // Solo hacer zoom si el zoom actual es menor que el objetivo
      if (this.map.getZoom() < targetZoom) {
        startZoom += zoomStep;
        if (startZoom > targetZoom) {
            startZoom = targetZoom; // Asegurarse de no pasar del objetivo
        }
        this.map.setZoom(startZoom);
      } else {
        this.map.setZoom(targetZoom); // Clavar el zoom final
        clearInterval(zoomInterval);
      }
    }, intervalTime);

    // 2. Limpiar todos los círculos anteriores (el principal y las subparcelas)
    if (this.circle) {
      this.circle.setMap(null);
    }
    this.subPlotCircles.forEach(circle => circle.setMap(null));
    this.subPlotCircles = [];

    // 3. DIBUJAMOS EL CÍRCULO PRINCIPAL ROJO
    this.circle = new google.maps.Circle({
      map: this.map,
      center: marker.getPosition(),
      radius: this.radioGeneral, // 110 metros
      fillColor: '#FF0000',
      fillOpacity: 0.2, // Un poco más transparente para ver lo de adentro
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    // 4. DIBUJAMOS LAS 5 SUBPARCELAS CELESTES
    const centerPoint = marker.getPosition();
    const subPlotRadius = 15;
    const distanceToCenter = 95;

    const subPlotOptions = {
      strokeColor: '#00BFFF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#87CEEB',
      fillOpacity: 0.45,
      map: this.map,
      radius: subPlotRadius
    };
    
    // Subparcela central
    this.subPlotCircles.push(new google.maps.Circle({ ...subPlotOptions, center: centerPoint }));

    // Subparcelas satélite
    const headings = [0, 90, 180, 270];
    headings.forEach(heading => {
      const satelliteCenter = google.maps.geometry.spherical.computeOffset(centerPoint, distanceToCenter, heading);
      this.subPlotCircles.push(new google.maps.Circle({ ...subPlotOptions, center: satelliteCenter }));
    });
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
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2A5gNXoB8-TYjCQJF7o9oEa3_B_EufKk&libraries=geometry&callback';
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