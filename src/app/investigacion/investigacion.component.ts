import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { investigacionService } from '../servicios/investigacion.service';
import { ConglomeradoConSubparcelas } from '../interfaces/conglomerado_subparcela';
import { EspecieId } from '../interfaces/especie';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-investigacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './investigacion.component.html',
  styleUrls: ['./investigacion.component.css']
})
export class InvestigacionComponent implements OnInit {

  especieId: EspecieId[] = [];

  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public investigacionService = inject(investigacionService);
  private fb = inject(FormBuilder);

  conglomeradosConSubparcelas: ConglomeradoConSubparcelas[] = [];

  conglomerado: { value: number, label: string }[] = [];
  subparcelasFiltradas: { value: number, label: string }[] = [];
  especie: { value: number, label: string }[] = [];

  form: FormGroup = this.fb.group({
    id_conglomerado: [null, Validators.required],
    id_subparcela: [null, Validators.required],
    id_especie: [''],
    altura_mt: [null, Validators.required],
    diametro_cm: [null, Validators.required],
    coordenadas: ['', [
      Validators.required,
      Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
    ]],
    identificador: [''],
    tipo: [''],
    fecha_recoleccion: [''],
    observaciones: [''],
    imagen: [null]
  });

  ngOnInit(): void {
  // Cargas normales
  this.investigacionService.obtenerConglomerados().subscribe({
    next: (data) => {
      this.conglomeradosConSubparcelas = data;
      this.conglomerado = data.map(m => ({
        value: m.id_conglomerado,
        label: m.identificador
      }));
    }
  });

  this.investigacionService.obtenerEspecie().subscribe({
    next: (data) => {
      this.especieId = data;
      this.especie = data.map(m => ({
        value: m.id_especie || null,
        label: m.nombre_comun
      }));
    }
  });

  // ✅ Observa cambios en 'identificador' y ajusta validadores
  this.form.get('identificador')?.valueChanges.subscribe((valor) => {
    const requiereValidadores = valor && valor.trim() !== '';

    const tipo = this.form.get('tipo');
    const fecha = this.form.get('fecha_recoleccion');

    if (requiereValidadores) {
      tipo?.setValidators([Validators.required]);
      fecha?.setValidators([Validators.required]);
    } else {
      tipo?.clearValidators();
      fecha?.clearValidators();
    }

    tipo?.updateValueAndValidity();
    fecha?.updateValueAndValidity();
  });
}

  onConglomeradoSeleccionado(id: number) {
    this.form.get('id_conglomerado')?.setValue(id);

    const seleccionado = this.conglomeradosConSubparcelas.find(c => c.id_conglomerado === id);
    this.subparcelasFiltradas = (seleccionado?.subparcelas || []).map(s => ({
      value: s.id_subparcela,
      label: s.numero_subparcela.toString()
    }));

    this.form.get('id_subparcela')?.reset();
  }

  onSubparcelaSeleccionada(id: number) {
    this.form.get('id_subparcela')?.setValue(id);
  }

  onEspecieSeleccionada(id: number) {
    this.form.get('id_especie')?.setValue(id);
  }

  fechaHoy(): string {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dd = hoy.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

guardarMuestra() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  const formData = new FormData();
  formData.append('id_conglomerado', String(this.form.get('id_conglomerado')?.value || ''));
  formData.append('id_subparcela', String(this.form.get('id_subparcela')?.value || ''));
  const idEspecieValue = this.form.get('id_especie')?.value;
  if (idEspecieValue !== null && idEspecieValue !== undefined && idEspecieValue !== '') {
    formData.append('id_especie', String(idEspecieValue));
  }
  formData.append('altura_mt', String(this.form.get('altura_mt')?.value || ''));
  formData.append('diametro_cm', String(this.form.get('diametro_cm')?.value || ''));
  formData.append('coordenadas', this.form.get('coordenadas')?.value || '');
  formData.append('identificador', String(this.form.get('identificador')?.value || ''));
  formData.append('tipo', this.form.get('tipo')?.value || '');
  formData.append('fecha_recoleccion', this.form.get('fecha_recoleccion')?.value || '');
  formData.append('observaciones', this.form.get('observaciones')?.value || '');

  const imagen = this.form.get('imagen')?.value;
  if (imagen) {
    formData.append('imagen', imagen);
  }

  // Debug: listar contenido del formData
  for (const pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }

  this.investigacionService.guardarMuestra(formData).subscribe({
    next: () => {
      alert('Muestra guardada con éxito.');
      this.form.reset();
      this.subparcelasFiltradas = [];
    },
    error: (err) => {
      console.error(err);
      alert('Error al guardar la muestra.');
    }
  });
}


  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.form.get('imagen')?.setValue(input.files[0]);
    }
  }
}
