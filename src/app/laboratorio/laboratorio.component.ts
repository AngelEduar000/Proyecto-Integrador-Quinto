import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaboratorioService } from '../servicios/laboratorio.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { EspecieId } from '../interfaces/especie';
import { ActivatedRoute, Router } from '@angular/router';
import { Muestra } from '../interfaces/muestra';

@Component({
  selector: 'app-laboratorio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {
  especieId: EspecieId[] = [];
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public laboratorioService = inject(LaboratorioService);
  private fb = inject(FormBuilder);
  form!: FormGroup;
  especie: { value: number, label: string }[] = [];
  codigoBusqueda: string = ''; // variable del input
  muestraFiltrada: Muestra | null = null; // resultado de búsqueda
  muestras: Muestra[] = [];

  ngOnInit(): void {
    // Cargar muestras
    this.laboratorioService.obtenerMuestras().subscribe({
      next: (res) => {
        this.muestras = res;
      },
      error: (err) => console.error('Error al obtener muestras:', err)
    });

    // Cargar especies
    this.laboratorioService.obtenerEspecie().subscribe({
      next: (res) => {
        this.especie = res.map(e => ({
          label: e.nombre_comun,
          value: e.id_especie
        }));
      },
      error: (err) => console.error('Error al obtener especies:', err)
    });

    // Inicializar formulario vacío (evita errores si no hay muestra filtrada)
    this.form = this.fb.group({
      id_especie: [null, Validators.required]
    });
  }

  buscarMuestra(): void {
    const cod = this.codigoBusqueda.trim().toLowerCase();
    this.muestraFiltrada = this.muestras.find(m =>
      m.identificador_muestra.toLowerCase() === cod
    ) || null;

    if (this.muestraFiltrada) {
      // Cargar especie actual en el formulario
      this.form.patchValue({
        id_especie: this.muestraFiltrada.id_especie
      });
    } else {
      // Si no encuentra muestra, resetear el formulario
      this.form.reset();
    }
  }

  obtenerNombreComun(id_especie: number): string {
    const especie = this.especie.find(e => e.value === id_especie);
    return especie ? especie.label : 'Desconocida';
  }

  guardarCambios(): void {
    if (this.form.invalid || !this.muestraFiltrada) {
      alert('Por favor, selecciona una muestra válida y una especie.');
      return;
    }

    const nuevaEspecieId = this.form.get('id_especie')?.value;

    this.laboratorioService.actualizarMuestra(this.muestraFiltrada.id_muestra, {
      id_especie: nuevaEspecieId
    }).subscribe({
      next: (res) => {
        alert(`Especie actualizada correctamente para la muestra: ${res.identificador_muestra}`);
        // Actualizar localmente la especie de la muestra filtrada
        if (this.muestraFiltrada) {
          this.muestraFiltrada.id_especie = nuevaEspecieId;
        }
      },
      error: (err) => {
        console.error('Error al actualizar muestra:', err);
        alert('Error al actualizar la especie, intenta de nuevo.');
      }
    });
  }

  onEspecieSeleccionada(nuevaEspecieId: number): void {
    this.form.get('id_especie')?.setValue(nuevaEspecieId);
  }

  abrirModalAgregarEspecie(): void {
  // Puedes abrir un modal o por ahora usar un prompt simple
  const nombre = prompt('Ingrese el nombre de la nueva especie:');
  if (nombre) {
    // Aquí podrías llamar a un servicio que guarde la especie en el backend
    console.log('Nueva especie a registrar:', nombre);
    // Luego actualizas la lista `especie` si es necesario
  }
}
}
