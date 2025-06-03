import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-especie',
  imports: [FormsModule],
  templateUrl: './add-especie.component.html',
  styleUrl: './add-especie.component.css'
})
export class AddEspecieComponent {
  nuevaEspecie = {
    nombre_comun: '',
    nombre_cientifico: '',
    familia: '',
    uso: ''
  };

  imagen: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  agregarEspecie() {
    if (!this.imagen) {
      alert('Debes seleccionar una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre_comun', this.nuevaEspecie.nombre_comun);
    formData.append('nombre_cientifico', this.nuevaEspecie.nombre_cientifico);
    formData.append('familia', this.nuevaEspecie.familia);
    formData.append('uso', this.nuevaEspecie.uso);
    formData.append('imagen', this.imagen, this.nuevaEspecie.nombre_comun);

    this.http.post('https://proyecto-integrador-quinto-backend.vercel.app/api/especie-completa', formData).subscribe({
      next: res => {
        alert('Especie agregada correctamente.');
        // Opcional: Resetear formulario
        this.nuevaEspecie = { nombre_comun: '', nombre_cientifico: '', familia: '', uso: '' };
        this.imagen = null;
      },
      error: err => {
        console.error('Error al guardar especie:', err);
        alert('Hubo un error al guardar la especie.');
      }
    });
  }
}
