import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conglomerado } from '../interfaces/conglomerado';
import { Brigadista } from '../interfaces/brigadista'; // Asegúrate de tener esta interfaz
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ideam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ideam.component.html',
  styleUrls: ['./ideam.component.css']
})
export class IdeamComponent implements OnInit {

  brigadaForm!: FormGroup;

  conglomerados: Conglomerado[] = [
    {
      id: 1,
      Identificador: 'CG01',
      FechaCreacion: new Date('2023-01-15'),
      FechaEstablecimiento: new Date('2023-02-01'),
      Region: 'Andina',
      Municipio: 'Bucaramanga',
      coordenadas: [7.12345, -73.12345]
    }
  ];

  // Simulación de brigadistas
  brigadistas: Brigadista[] = [
    {
      id_usuario: 1,
      nombre: 'Ana Gómez',
      correo: 'ana@correo.com',
      direccion: 'Calle 123',
      telefono: '3001234567',
      rol: 'Investigador'
    },
    {
      id_usuario: 2,
      nombre: 'Luis Pérez',
      correo: 'luis@correo.com',
      direccion: 'Carrera 45',
      telefono: '3109876543',
      rol: 'CoInvestigador'
    },
    {
      id_usuario: 3,
      nombre: 'Clara Ríos',
      correo: 'clara@correo.com',
      direccion: 'Avenida Siempre Viva',
      telefono: '3204567890',
      rol: 'Investigador'
    }
  ];

  // Filtrados
  investigadores: Brigadista[] = [];
  coinvestigadores: Brigadista[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Separar por rol
    this.investigadores = this.brigadistas.filter(b => b.rol === 'Investigador');
    this.coinvestigadores = this.brigadistas.filter(b => b.rol === 'CoInvestigador');

    // Formulario
    this.brigadaForm = this.fb.group({
      nombreBrigada: ['', Validators.required],
      fechaVisita: ['', Validators.required],
      jefeBrigada: ['', Validators.required], // solo investigadores
      investigador: [[], Validators.required],
      CoInvestigador: [[]]
    });
  }

  onSubmit(): void {
    if (this.brigadaForm.valid) {
      console.log('Formulario enviado:', this.brigadaForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
