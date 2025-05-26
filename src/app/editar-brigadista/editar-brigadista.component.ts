import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BrigadistasService } from '../servicios/brigadista.service';
import { Brigadista } from '../interfaces/brigadista';

@Component({
  selector: 'app-editar-brigadista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-brigadista.component.html',
  styleUrls: ['./editar-brigadista.component.css']
})
export class EditarBrigadistaComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private brigadistaService = inject(BrigadistasService);

  brigadistaForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    direccion: [''],
    telefono: [''],
    rol: ['']
  });

  id: number = 0;

  constructor() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarBrigadista();
  }

  cargarBrigadista() {
    this.brigadistaService.obtenerBrigadistaPorId(this.id).subscribe({
      next: (data) => this.brigadistaForm.patchValue(data),
      error: (err) => console.error('Error al cargar brigadista', err)
    });
  }

  onSubmit() {
    if (this.brigadistaForm.invalid) return;

    const datosActualizados: Brigadista = this.brigadistaForm.value;

    this.brigadistaService.actualizarBrigadista(this.id, datosActualizados).subscribe({
      next: () => {
        alert('Brigadista actualizado correctamente');
        this.router.navigate(['/ideam']); // O a donde prefieras
      },
      error: (err) => console.error('Error al actualizar', err)
    });
  }
}
