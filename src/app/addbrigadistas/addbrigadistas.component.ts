import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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
  templateUrl: './addbrigadistas.component.html',
  styleUrls: ['./addbrigadistas.component.css']
})
export class AddEditBrigadistasComponent implements OnInit {

  brigadistaForm!: FormGroup;
  idBrigadista: number | null = null;

  public fb = inject(FormBuilder);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public brigadistaService = inject(BrigadistasService);

  ngOnInit(): void {
    this.brigadistaForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    const idNum = idParam ? Number(idParam) : null;
    if (idNum && !isNaN(idNum)) {
      this.idBrigadista = idNum;
      this.brigadistaService.obtenerBrigadistaPorId(this.idBrigadista).subscribe({
        next: (brigadista: Brigadista) => {
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
      const brigadista: Brigadista = this.brigadistaForm.value;

      if (this.idBrigadista) {
        // Actualizar brigadista existente
        this.brigadistaService.actualizarBrigadista(this.idBrigadista, brigadista).subscribe({
          next: () => {
            alert('Brigadista editado correctamente');
            this.router.navigate(['/ideam']);
          },
          error: () => alert('Error al editar el brigadista')
        });
      } else {
        // Agregar nuevo brigadista
        this.brigadistaService.agregarBrigadista(brigadista).subscribe({
          next: () => {
            alert('Brigadista registrado correctamente');
            this.router.navigate(['/ideam']);
          },
          error: () => alert('Error al registrar el brigadista')
        });
      }
    } else {
      this.brigadistaForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
}
