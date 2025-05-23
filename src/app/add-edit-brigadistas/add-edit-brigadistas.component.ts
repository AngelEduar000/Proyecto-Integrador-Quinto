import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BrigadistasService } from '../servicios/brigadista.service';
import { Brigadista } from '../interfaces/brigadista';

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
  idBrigadista: number | null = null;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private brigadistaService: BrigadistasService
  ) {}

ngOnInit(): void {
  this.brigadistaForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    rol: ['', Validators.required]
  });

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.idBrigadista = parseInt(idParam, 10);
    this.brigadistaService.obtenerBrigadistaPorId(this.idBrigadista).subscribe({
      next: (brigadista: Brigadista) => {
        // No incluir el ID aquí
        this.brigadistaForm.patchValue({
          nombre: brigadista.nombre,
          correo: brigadista.correo,
          direccion: brigadista.direccion,
          telefono: brigadista.telefono,
          rol: brigadista.rol
        });
      },
      error: () => {
        alert('Error al cargar el brigadista. Verifica que el ID sea válido.');
      }
    });
  }
}


onSubmit(): void {
  if (this.brigadistaForm.valid) {
    const brigadista = this.brigadistaForm.value;

    if (this.idBrigadista) {
      // Enviar brigadista y el ID separado
      console.log('Editar brigadista con ID:', this.idBrigadista, brigadista);
      alert('Brigadista editado correctamente');
    } else {
      console.log('Registrar brigadista:', brigadista);
      alert('Brigadista registrado correctamente');
    }

    this.brigadistaForm.reset();
  } else {
    this.brigadistaForm.markAllAsTouched();
    alert('Formulario inválido. Por favor, corrija los errores.');
  }
}


}
