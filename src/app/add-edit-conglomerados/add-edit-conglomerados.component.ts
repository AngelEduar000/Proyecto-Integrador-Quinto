import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-conglomerado',
  templateUrl: './add-edit-conglomerados.component.html',
  styleUrls: ['./add-edit-conglomerados.component.css'],
  standalone: true, // ✅ Asegúrate de que esté en modo standalone si lo usas así
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AgregarConglomeradoComponent implements OnInit {
  conglomeradoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.conglomeradoForm = this.fb.group({
      identificador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      region: ['', Validators.required],
      municipio: ['', Validators.required],
      latitud: ['', [Validators.required, Validators.pattern('^-?(?:\\d+|\\d+\\.\\d+)$')]],
      longitud: ['', [Validators.required, Validators.pattern('^-?(?:\\d+|\\d+\\.\\d+)$')]],
    });
  }
//LOGICA ALERTA
  onSubmit(): void {
    if (this.conglomeradoForm.valid) {
      const nuevoConglomerado = this.conglomeradoForm.value;
  
      // Aquí iría tu lógica para enviar los datos
      console.log('Conglomerado registrado:', nuevoConglomerado);
  
      // Mostrar alerta de éxito
      alert('Conglomerado registrado correctamente');
  
      // Resetear el formulario
      this.conglomeradoForm.reset();
    } else {
      this.conglomeradoForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
  
}