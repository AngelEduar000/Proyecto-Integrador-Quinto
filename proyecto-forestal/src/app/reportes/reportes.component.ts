import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  reportes = [
    {
      titulo: 'Expedición Amazonas 2024',
      fecha: '2024-08-12',
      zona: 'Amazonas',
      especies: 12,
      equipo: 'Grupo Ecológico Andino',
      resumen: 'Se identificaron especies nativas con alto valor ecológico.'
    },
    {
      titulo: 'Monitoreo Sierra Nevada',
      fecha: '2024-06-05',
      zona: 'Sierra Nevada',
      especies: 7,
      equipo: 'BioAndes',
      resumen: 'Estudio sobre regeneración natural post-incendio.'
    },
    {
      titulo: 'Estudio Chocó biogeográfico',
      fecha: '2024-04-22',
      zona: 'Chocó',
      especies: 9,
      equipo: 'Flora Pacífico',
      resumen: 'Levantamiento florístico en zonas de difícil acceso.'
    }
  ];

  get totalReportes() {
    return this.reportes.length;
  }

  get totalEspecies() {
    return this.reportes.reduce((acc, r) => acc + r.especies, 0);
  }

  get zonasResumen() {
    const zonas = this.reportes.map(r => r.zona);
    const conteo = zonas.reduce((acc: any, zona) => {
      acc[zona] = (acc[zona] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(conteo).map(([nombre, valor]) => ({ nombre, valor }));
  }
}
