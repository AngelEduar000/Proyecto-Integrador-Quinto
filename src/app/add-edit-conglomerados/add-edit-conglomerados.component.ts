import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ConglomeradosService } from '../servicios/conglomerado.service';
import { Conglomerado } from '../interfaces/conglomerado';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MunicipiosService } from '../servicios/municipios.service';

@Component({
  selector: 'app-agregar-conglomerado',
  templateUrl: './add-edit-conglomerados.component.html',
  styleUrls: ['./add-edit-conglomerados.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DropdownComponent]
})
export class AgregarConglomeradoComponent implements OnInit {
  conglomeradoForm!: FormGroup;
  municipios: any[] = [];
  municipiosDropdown: { label: string, value: any }[] = [];

  regiones = [
    { value: 'Andina', label: 'Andina' },
    { value: 'Caribe', label: 'Caribe' },
    { value: 'Pacífica', label: 'Pacífica' },
    { value: 'Orinoquía', label: 'Orinoquía' },
    { value: 'Amazónica', label: 'Amazónica' },
    { value: 'Insular', label: 'Insular' }
  ]

  public fb = inject(FormBuilder);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public conglomeradosService = inject(ConglomeradosService);
  public municipiosService = inject(MunicipiosService);

  ngOnInit(): void {
    this.conglomeradoForm = this.fb.group({
      identificador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaEstablecimiento: ['', Validators.required],
      region: ['', Validators.required],
      municipio: ['', Validators.required],
      latitud: ['', [Validators.required, Validators.pattern('^-?(?:\\d+|\\d+\\.\\d+)$')]],
      longitud: ['', [Validators.required, Validators.pattern('^-?(?:\\d+|\\d+\\.\\d+)$')]],
    });

    this.municipiosService.obtenerMunicipios().subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.municipiosDropdown = municipios.map(m => ({
          label: `${m.nombre}, ${m.departamento}`,
          value: m.id
        }));
      },
      error: (err) => {
        console.error('Error al cargar municipios:', err);
      }
    });
  }

  changeSelectRegion(value: any) {
    this.conglomeradoForm.controls['region'].setValue(value);
    this.conglomeradoForm.updateValueAndValidity();
  }

  changeSelectMunicipio(value: any) {
    this.conglomeradoForm.controls['municipio'].setValue(value);
    this.conglomeradoForm.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.conglomeradoForm.valid) {
      const form = this.conglomeradoForm.value;

      const nuevoConglomerado: Conglomerado = {
        identificador: form.identificador,
        fecha_creacion: new Date(form.fechaCreacion),
        fecha_establecimiento: new Date(form.fechaEstablecimiento),
        nombre_region: form.region,
        id_municipio: form.municipio,  // mejor que nombre_municipio para indicar que es un ID
        coordenadas: [parseFloat(form.latitud), parseFloat(form.longitud)],
        id_conglomerado: 0
      };

      this.conglomeradosService.agregarConglomerado(nuevoConglomerado).subscribe({
        next: () => {
          alert('Conglomerado registrado correctamente');
          this.conglomeradoForm.reset();
          this.router.navigate(['/ideam']);
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
