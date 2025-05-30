import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import necesario para *ngFor
import { FormsModule } from '@angular/forms';     // Import necesario para ngModel
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit {

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

  ngAfterViewInit() {
    this.cargarReporte();
  }

  cargarReporte() {
    if (this.chart) {
      this.chart.destroy();
    }
    switch (this.tipoReporteSeleccionado) {
      case 'arbolesPorConglomerado':
        this.tituloReporte = 'Cantidad de árboles por conglomerado';
        this.columnasTabla = ['conglomerado', 'cantidad'];
        this.datosTabla = [
          { conglomerado: 'Conglomerado A', cantidad: 120 },
          { conglomerado: 'Conglomerado B', cantidad: 95 },
          { conglomerado: 'Conglomerado C', cantidad: 75 },
        ];
        this.generarGraficoBarra(this.datosTabla, 'conglomerado', 'cantidad');
        break;

      case 'conglomeradosPorRegion':
        this.tituloReporte = 'Cantidad de conglomerados por región';
        this.columnasTabla = ['region', 'cantidad'];
        this.datosTabla = [
          { region: 'Región Norte', cantidad: 5 },
          { region: 'Región Centro', cantidad: 8 },
          { region: 'Región Sur', cantidad: 3 },
        ];
        this.generarGraficoPie(this.datosTabla, 'region', 'cantidad');
        break;

      case 'especiesMasComunes':
        this.tituloReporte = 'Especies más comunes en región';
        this.columnasTabla = ['especie', 'cantidad'];
        this.datosTabla = [
          { especie: 'Especie X', cantidad: 45 },
          { especie: 'Especie Y', cantidad: 30 },
          { especie: 'Especie Z', cantidad: 20 },
        ];
        this.generarGraficoBarra(this.datosTabla, 'especie', 'cantidad');
        break;

      case 'conglomeradosMasEspecies':
        this.tituloReporte = 'Conglomerados con mayor diversidad de especies';
        this.columnasTabla = ['conglomerado', 'especies_distintas'];
        this.datosTabla = [
          { conglomerado: 'Conglomerado A', especies_distintas: 15 },
          { conglomerado: 'Conglomerado B', especies_distintas: 12 },
          { conglomerado: 'Conglomerado C', especies_distintas: 10 },
        ];
        this.generarGraficoBarra(this.datosTabla, 'conglomerado', 'especies_distintas');
        break;

      case 'totalArboles':
        this.tituloReporte = 'Total de árboles registrados';
        this.columnasTabla = ['total'];
        this.datosTabla = [{ total: 290 }];
        this.generarGraficoIndicador(this.datosTabla[0].total);
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
          label: labelY,
          data: datos.map(d => d[labelY]),
          backgroundColor: 'rgba(93, 187, 99, 0.7)',
          borderColor: 'rgba(74, 156, 68, 1)',
          borderWidth: 1,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
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
            'rgba(93, 187, 99, 0.7)',
            'rgba(74, 156, 68, 0.7)',
            'rgba(56, 118, 51, 0.7)',
            'rgba(37, 79, 35, 0.7)',
            'rgba(18, 41, 19, 0.7)'
          ],
          borderColor: 'rgba(255,255,255,0.8)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: 'white' } },
          tooltip: { enabled: true }
        }
      }
    });
  }

  private generarGraficoIndicador(total: number) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d')!;
    ctx.clearRect(0, 0, this.chartCanvas.nativeElement.width, this.chartCanvas.nativeElement.height);
    ctx.font = 'bold 48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(total.toString(), this.chartCanvas.nativeElement.width / 2, this.chartCanvas.nativeElement.height / 2);
  }
}
