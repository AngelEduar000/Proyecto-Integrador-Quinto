import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ConglomeradosService } from '../servicios/conglomerado.service';
import { Conglomerado } from '../interfaces/conglomerado';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MunicipiosService } from '../servicios/municipios.service';
import { Conglomerado2 } from '../interfaces/conglomerado2';

@Component({
  selector: 'app-agregar-conglomerado',
  templateUrl: './add-edit-conglomerados.component.html',
  styleUrls: ['./add-edit-conglomerados.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DropdownComponent]
})
export class AgregarConglomeradoComponent implements OnInit {

  public conglomeradoService = inject(ConglomeradosService);
  public fb = inject(FormBuilder);
  public route = inject(ActivatedRoute);
  public router = inject(Router);

  regiones = [
    { value: 1, label: 'Andina' },
    { value: 2, label: 'Caribe' },
    { value: 3, label: 'Pacífica' },
    { value: 4, label: 'Orinoquía' },
    { value: 5, label: 'Amazónica' },
    { value: 6, label: 'Insular' }
  ];

  conglomeradoForm!: FormGroup;
  idConglomerado: number | null = null;
  municipios: { value: number, label: string }[] = [];
  constructor(private municipiosService: MunicipiosService) {}

  ngOnInit(): void {
    this.conglomeradoForm = this.fb.group({
      identificador: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      fecha_establecimiento: ['', Validators.required],
      region: [null, Validators.required],
      municipio: ['', Validators.required],
      coordenadas: ['', [
        Validators.required,
        Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
      ]]
    });

    this.municipiosService.obtenerMunicipios().subscribe({
      next: (data) => {
        this.municipios = data.map(m => ({
          value: m.id,
          label: `${m.nombre}, ${m.departamento}`
        }));

        const idParam = this.route.snapshot.paramMap.get('id');
        const idNum = idParam ? Number(idParam) : null;
        if (idNum && !isNaN(idNum)) {
          this.idConglomerado = idNum;
          this.conglomeradoService.obtenerConglomeradoPorId(this.idConglomerado).subscribe({
            next: (conglomerado: Conglomerado) => {
              const regionEncontrada = this.regiones.find(
                r => r.label === conglomerado.nombre_region
              )?.value ?? null;

              const municipioLabel = `${conglomerado.nombre_municipio.nombre}, ${conglomerado.nombre_municipio.departamento}`;
              const municipioEncontrado = this.municipios.find(
                m => m.label === municipioLabel
              )?.value ?? null;

              // Formatear fechas al formato esperado por <input type="date">
              const toDateInputFormat = (date: string | Date): string => {
                const d = new Date(date);
                return d.toISOString().split('T')[0];
              };

              this.conglomeradoForm.patchValue({
                identificador: conglomerado.identificador,
                fecha_creacion: toDateInputFormat(conglomerado.fecha_creacion),
                fecha_establecimiento: toDateInputFormat(conglomerado.fecha_establecimiento),
                region: regionEncontrada,
                municipio: municipioEncontrado,
                coordenadas: conglomerado.coordenadas
              });
            },
            error: () => {
              alert('Error al cargar el conglomerado. Verifica que el ID sea válido.');
            }
          });
        }
      },
      error: () => {
        console.error('Error al cargar municipios');
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
      const formValue = this.conglomeradoForm.value;

      const conglomerado: Conglomerado = {
        identificador: formValue.identificador,
        fecha_creacion: formValue.fecha_creacion,
        fecha_establecimiento: formValue.fecha_establecimiento,
        nombre_region: this.regiones.find(r => r.value === formValue.region)?.label || '',
        nombre_municipio: this.municipios.find(m => m.value === formValue.municipio)?.label || '',
        coordenadas: formValue.coordenadas
      };

      const conglomerado2: Conglomerado2 = {
        identificador: formValue.identificador,
        fecha_creacion: formValue.fecha_creacion,
        fecha_establecimiento: formValue.fecha_establecimiento,
        id_region: formValue.region,
        id_municipio: formValue.municipio,
        coordenadas: formValue.coordenadas
      };

      if (this.idConglomerado) {
        this.conglomeradoService.actualizarConglomerado(this.idConglomerado, conglomerado2).subscribe({
          next: () => {
            alert('Conglomerado editado correctamente');
            this.router.navigate(['/ideam']);
          },
          error: () => alert('Error al editar el conglomerado')
        });
      } else {
        this.conglomeradoService.agregarConglomerado(conglomerado2).subscribe({
          next: () => {
            alert('Conglomerado registrado correctamente');
            this.router.navigate(['/ideam']);
          },
          error: () => alert('Error al registrar el conglomerado')
        });
      }
    } else {
      this.conglomeradoForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
}
