import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ConglomeradosService } from '../servicios/conglomerado.service';
import { Conglomerado } from '../interfaces/conglomerado';

@Component({
  selector: 'app-agregar-conglomerado',
  templateUrl: './add-edit-conglomerados.component.html',
  styleUrls: ['./add-edit-conglomerados.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AgregarConglomeradoComponent implements OnInit {
  conglomeradoForm!: FormGroup;

  public fb = inject(FormBuilder);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public conglomeradosService = inject(ConglomeradosService);

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

  onSubmit(): void {
    if (this.conglomeradoForm.valid) {
      const form = this.conglomeradoForm.value;

      const nuevoConglomerado: Conglomerado = {
        identificador: form.identificador,
        fecha_creacion: new Date(form.fechaCreacion),
        fecha_establecimiento: new Date(form.fechaCreacion), // o puedes tener otro campo en el form si lo necesitas
        nombre_region: form.region,
        nombre_municipio: form.municipio,
        coordenadas: [parseFloat(form.latitud), parseFloat(form.longitud)],
        id_conglomerado: 0 // o puedes omitirlo si no se necesita al crear
      };

      this.conglomeradosService.agregarConglomerado(nuevoConglomerado).subscribe({
        next: (res) => {
          alert('Conglomerado registrado correctamente');
          this.conglomeradoForm.reset();
          this.router.navigate(['/conglomerados']); // Opcional: redirigir a lista
        },
        error: (err) => {
          console.error('Error al registrar conglomerado', err);
          alert('Error al registrar el conglomerado.');
        }
      });
    } else {
      this.conglomeradoForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
}
