// src/app/brigadas/brigadas.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrigadaService, Brigada } from '../servicios/mostrar-brigada.service';

@Component({
  selector: 'app-brigadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brigada.component.html',
  styleUrls: ['./brigada.component.css']
})
export class BrigadasComponent implements OnInit {
  brigadas: Brigada[] = [];
  loading = true;
  error = false;

  constructor(private brigadaService: BrigadaService) {}

  ngOnInit(): void {
    this.brigadaService.obtenerBrigadas().subscribe({
      next: (data) => {
        this.brigadas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener brigadas', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
