import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit, OnInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  tiposReporte = [
    { value: 'arbolesPorConglomerado', label: 'Cantidad de árboles por conglomerado' },
    { value: 'conglomeradosPorRegion', label: 'Cantidad de conglomerados por región' },
    { value: 'especiesMasComunes', label: 'Especies más comunes en región' },
    { value: 'conglomeradosMasEspecies', label: 'Conglomerados con más especies' },
    { value: 'totalArboles', label: 'Total de árboles registrados' }
  ];

  tipoReporteSeleccionado = this.tiposReporte[0].value;
  tituloReporte = '';
  columnasTabla: string[] = [];
  datosTabla: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Si quieres que cargue el reporte por defecto en Init
    // this.cargarReporte();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cargarReporte();
    });
  }

cargarReporte() {
  if (this.chart) {
    this.chart.destroy();
  }

  switch (this.tipoReporteSeleccionado) {
    case 'arbolesPorConglomerado':
      this.tituloReporte = 'Cantidad de árboles por conglomerado';
      this.columnasTabla = ['conglomerado', 'cantidad'];
      this.http.get<any[]>('https://proyecto-integrador-quinto-backend.vercel.app/api/reporte_conglomerado').subscribe(data => {
        this.datosTabla = data.map(d => ({
          conglomerado: d.identificador,
          cantidad: +d.cantidad_arboles
        }));
        this.generarGraficoBarra(this.datosTabla, 'conglomerado', 'cantidad');
      });
      break;

    case 'conglomeradosPorRegion':
      this.tituloReporte = 'Cantidad de conglomerados por región';
      this.columnasTabla = ['region', 'cantidad'];
      this.http.get<any[]>('https://proyecto-integrador-quinto-backend.vercel.app/api/reporte_region_conglomerados').subscribe(data => {
        this.datosTabla = data.map(d => ({
          region: d.nombre_region,
          cantidad: +d.cantidad_conglomerados
        }));
        this.generarGraficoPie(this.datosTabla, 'region', 'cantidad');
      });
      break;

    case 'especiesMasComunes':
      this.tituloReporte = 'Especies más comunes en región';
      this.columnasTabla = ['especie', 'cantidad'];
      this.http.get<any[]>('https://proyecto-integrador-quinto-backend.vercel.app/api/reporte_especies_mas_arboles').subscribe(data => {
        this.datosTabla = data.map(d => ({
          especie: d.nombre_comun,
          cantidad: +d.cantidad_arboles
        }));
        this.generarGraficoBarra(this.datosTabla, 'especie', 'cantidad');
      });
      break;

    case 'conglomeradosMasEspecies':
      this.tituloReporte = 'Conglomerados con mayor diversidad de especies';
      this.columnasTabla = ['conglomerado', 'especies_distintas'];
      this.http.get<any[]>('https://proyecto-integrador-quinto-backend.vercel.app/api/reporte_conglomerados_mas_especies').subscribe(data => {
        this.datosTabla = data.map(d => ({
          conglomerado: d.identificador,
          especies_distintas: +d.cantidad_especies
        }));
        this.generarGraficoBarra(this.datosTabla, 'conglomerado', 'especies_distintas');
      });
      break;

    case 'totalArboles':
      this.tituloReporte = 'Total de árboles registrados';
      this.columnasTabla = ['total'];
      this.http.get<{total_arboles:number}>('https://proyecto-integrador-quinto-backend.vercel.app/api/reporte_total_arboles').subscribe(data => {
        this.datosTabla = [{ total: data.total_arboles }];
        this.generarGraficoIndicador(data.total_arboles);
        this.chart = undefined!;
      });
      break;

    default:
      this.tituloReporte = '';
      this.columnasTabla = [];
      this.datosTabla = [];
  }
}

  private generarGraficoBarra(datos: any[], labelX: string, labelY: string) {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: datos.map(d => d[labelX]),
        datasets: [{
          label: this.tituloReporte,
          data: datos.map(d => d[labelY]),
          backgroundColor: 'rgba(93, 187, 99, 0.7)',
          borderColor: 'rgba(74, 156, 68, 1)',
          borderWidth: 1,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  private generarGraficoPie(datos: any[], labelX: string, labelY: string) {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: datos.map(d => d[labelX]),
        datasets: [{
          data: datos.map(d => d[labelY]),
          backgroundColor: [
            'rgba(93, 187, 99, 0.7)',  // verde claro
            'rgba(74, 156, 68, 0.7)',  // verde medio
            'rgba(56, 118, 51, 0.7)',  // verde oscuro
            'rgba(37, 79, 35, 0.7)',   // verde bosque
            'rgba(18, 41, 19, 0.7)',   // verde muy oscuro
            'rgba(134, 194, 133, 0.7)' // verde suave
          ],
          borderColor: 'rgba(255,255,255,0.8)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: 'white' } },
          tooltip: { enabled: true }
        }
      }
    });
  }

  private generarGraficoIndicador(total: number) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d')!;
    if (ctx) {
        ctx.clearRect(0, 0, this.chartCanvas.nativeElement.width, this.chartCanvas.nativeElement.height);
        ctx.font = 'bold 48px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(total.toString(), this.chartCanvas.nativeElement.width / 2, this.chartCanvas.nativeElement.height / 2);
    }
  }
}
