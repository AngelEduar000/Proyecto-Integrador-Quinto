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
  id_conglomerado?: number;

  regiones = [
    { value: 'Andina', label: 'Andina' },
    { value: 'Caribe', label: 'Caribe' },
    { value: 'Pacífica', label: 'Pacífica' },
    { value: 'Orinoquía', label: 'Orinoquía' },
    { value: 'Amazónica', label: 'Amazónica' },
    { value: 'Insular', label: 'Insular' }
  ];

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
      coordenadas: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?\\s*,\\s*-?\\d+(\\.\\d+)?$')]]
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

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id_conglomerado = +params['id'];
        this.cargarDatos(this.id_conglomerado);
      }
    });
  }

  cargarDatos(id: number): void {
    this.conglomeradosService.obtenerConglomeradoPorId(id).subscribe({
      next: (conglomerado) => {
        let coordenadasStr = '';
        if (Array.isArray(conglomerado.coordenadas)) {
          coordenadasStr = `${conglomerado.coordenadas[0]},${conglomerado.coordenadas[1]}`;
        } else if (typeof conglomerado.coordenadas === 'string') {
          coordenadasStr = conglomerado.coordenadas;
        }

        this.conglomeradoForm.patchValue({
          identificador: conglomerado.identificador,
          fechaCreacion: new Date(conglomerado.fecha_creacion).toISOString().substring(0, 10),
          fechaEstablecimiento: new Date(conglomerado.fecha_establecimiento).toISOString().substring(0, 10),
          region: conglomerado.nombre_region,
          municipio: conglomerado.id_municipio,
          coordenadas: coordenadasStr
        });
      },
      error: (err) => {
        console.error('Error al cargar conglomerado:', err);
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
      const [lat, lng] = form.coordenadas.split(',').map((c: string) => parseFloat(c.trim()));

      const nuevoConglomerado: Conglomerado = {
        identificador: form.identificador,
        fecha_creacion: new Date(form.fechaCreacion),
        fecha_establecimiento: new Date(form.fechaEstablecimiento),
        nombre_region: form.region,
        id_municipio: form.municipio,
        coordenadas: `${lat},${lng}`,
        id_conglomerado: this.id_conglomerado ?? 0
      };

      const peticion$ = this.id_conglomerado
        ? this.conglomeradosService.actualizarConglomerado(this.id_conglomerado, nuevoConglomerado)
        : this.conglomeradosService.agregarConglomerado(nuevoConglomerado);

      peticion$.subscribe({
        next: () => {
          alert(this.id_conglomerado ? 'Conglomerado actualizado correctamente' : 'Conglomerado registrado correctamente');
          this.conglomeradoForm.reset();
          this.router.navigate(['/ideam']);
        },
        error: (err) => {
          console.error('Error al guardar conglomerado', err);
          alert('Error al guardar el conglomerado.');
        }
      });
    } else {
      this.conglomeradoForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
}
