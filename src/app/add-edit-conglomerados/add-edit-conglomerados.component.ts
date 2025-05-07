import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-conglomerado',
  templateUrl: './add-edit-conglomerados.component.html',
  styleUrls: ['./add-edit-conglomerados.component.css']
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
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.conglomeradoForm.valid) {
      const nuevoConglomerado = this.conglomeradoForm.value;
      console.log('Formulario enviado:', nuevoConglomerado);
    } else {
      console.log('Formulario inválido');
      this.conglomeradoForm.markAllAsTouched();
    }
  }
}
