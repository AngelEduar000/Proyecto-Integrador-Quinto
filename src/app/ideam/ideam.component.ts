import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conglomerado } from '../interfaces/conglomerado';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ideam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ideam.component.html',
  styleUrls: ['./ideam.component.css']
})
export class IdeamComponent implements OnInit {

  brigadaForm!: FormGroup;  // <- corregido con '!'
  
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brigadaForm = this.fb.group({
      nombreBrigada: ['', Validators.required],
      fechaVisita: ['', Validators.required],
      jefeBrigada: ['', Validators.required],
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
