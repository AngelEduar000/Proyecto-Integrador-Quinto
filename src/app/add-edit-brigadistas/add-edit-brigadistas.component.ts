import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-edit-brigadistas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  templateUrl: './add-edit-brigadistas.component.html',
  styleUrls: ['./add-edit-brigadistas.component.css']
})
export class AddEditBrigadistasComponent implements OnInit {

  brigadistaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.brigadistaForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }
//LOGICA ALERTA
  onSubmit(): void {
    if (this.brigadistaForm.valid) {
      const nuevoBrigadista = this.brigadistaForm.value;
  
      // Aquí iría tu lógica para enviar los datos al backend o servicio
      console.log('Brigadista registrado:', nuevoBrigadista);
  
      // Mostrar alerta de éxito
      alert('Brigadista registrado correctamente');
  
      // Resetear formulario si deseas
      this.brigadistaForm.reset();
    } else {
      this.brigadistaForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
  

}
