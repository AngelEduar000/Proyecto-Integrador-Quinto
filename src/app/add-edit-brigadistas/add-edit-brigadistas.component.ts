import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-edit-brigadistas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-edit-brigadistas.component.html',
  styleUrls: ['./add-edit-brigadistas.component.css']
})
export class AddEditBrigadistasComponent implements OnInit {

  brigadistaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brigadistaForm = this.fb.group({
      id_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.brigadistaForm.valid) {
      console.log('Formulario enviado:', this.brigadistaForm.value);
      // Aquí podrías llamar a un servicio para guardar los datos, por ejemplo:
      // this.brigadistaService.save(this.brigadistaForm.value).subscribe(...)
    } else {
      console.log('Formulario inválido');
    }
  }

}
