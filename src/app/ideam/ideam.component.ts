import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrigadistasService } from '../servicios/brigadista.service';
import { Brigadista } from '../interfaces/brigadista';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ideam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ideam.component.html',
  styleUrls: ['./ideam.component.css']
})
export class IdeamComponent implements OnInit {

  brigadaForm!: FormGroup;
  brigadistas: Brigadista[] = [];
  investigadores: Brigadista[] = [];
  coinvestigadores: Brigadista[] = [];
  conglomerados: any[] = [];

  

  constructor(private fb: FormBuilder, private brigadistaService: BrigadistasService) {}

  ngOnInit(): void {
    this.brigadaForm = this.fb.group({
      nombreBrigada: ['', Validators.required],
      fechaVisita: ['', Validators.required],
      jefeBrigada: ['', Validators.required],
      investigador: ['', Validators.required], // corregido: no es array
      CoInvestigador: ['', Validators.required] // añadido Validators.required para coherencia con HTML
    });
    

    // Obtener brigadistas desde el servicio
    this.brigadistaService.obtenerBrigadistas().subscribe(data => {
      this.brigadistas = data;

      // Filtrar según el rol
      this.investigadores = this.brigadistas.filter(b => b.rol === 'Investigador');
      this.coinvestigadores = this.brigadistas.filter(b => b.rol === 'CoInvestigador');
    });
  }

  // Manejo del formulario
  onSubmit(): void {
    if (this.brigadaForm.valid) {
      const nuevaBrigada = this.brigadaForm.value;

      // Lógica de envío de datos (puedes reemplazar esto con una llamada al backend)
      console.log('Brigada registrada:', nuevaBrigada);

      // Mensaje de éxito
      alert('Brigada registrada correctamente');

      // Reiniciar el formulario
      this.brigadaForm.reset();
    } else {
      this.brigadaForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }
    eliminarBrigadista(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este brigadista?')) {
      this.brigadistas = this.brigadistas.filter(b => b.id_usuario !== id);
    }
  }
    eliminarConglomerado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este conglomerado?')) {
      // Aquí puedes implementar la lógica real, por ahora solo muestra por consola
      console.log(`Conglomerado con ID ${id} eliminado.`);
    }
  }

}
