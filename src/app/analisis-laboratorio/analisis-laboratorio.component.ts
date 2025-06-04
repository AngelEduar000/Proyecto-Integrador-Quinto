import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // 👉 IMPORTANTE

@Component({
  selector: 'app-analisis-laboratorio',
  standalone: true,
  templateUrl: './analisis-laboratorio.component.html',
  styleUrls: ['./analisis-laboratorio.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule] // 👉 Solo necesario si es standalone
})
export class AnalisisLaboratorioComponent {
  analisisForm: FormGroup;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute // 👉 Inyección correcta
  ) {
    this.analisisForm = this.fb.group({
      identificador: ['', Validators.required],
      id_muestra: [null, Validators.required],
      clasificacion_taxonomica: ['', Validators.required],
      resultados: ['', Validators.required],
      metodo_de_analisis: ['', Validators.required],
      fecha_modificacion: ['', Validators.required]
    });

    // Obtener parámetros de la URL y precargar los campos
    this.route.queryParams.subscribe(params => {
      this.analisisForm.patchValue({
        id_muestra: params['id_muestra'],
        identificador: params['identificador']
      });
    });
  }

guardarAnalisis() {
  if (this.analisisForm.invalid) return;

  this.http.post(
    'https://proyecto-integrador-quinto-backend.vercel.app/api/analisis_laboratorio',
    this.analisisForm.value
  ).subscribe({
    next: () => {
      this.mensaje = 'Análisis guardado correctamente.';
      this.analisisForm.reset();
    },
    error: (error) => {
      console.error('Error al guardar:', error);
      this.mensaje = 'Error al guardar el análisis.';
    }
  });
}

}
