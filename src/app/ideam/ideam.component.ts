import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrigadistasService } from '../servicios/brigadista.service';
import { ConglomeradosService } from '../servicios/conglomerado.service'; // IMPORTAR servicio conglomerado
import { Brigadista } from '../interfaces/brigadista';
import { Conglomerado } from '../interfaces/conglomerado';
import { Conglomerado2 } from '../interfaces/conglomerado2';
import { RouterModule } from '@angular/router';
import { BrigadaService } from '../servicios/brigada.service'; // IMPORTAR

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
  brigadistasConNombre: { id_brigadista: number, nombre_brigadista: string }[] = [];
conglomeradosConNombre: { id_conglomerado: number, identificador_conglomerado: string }[] = [];

  conglomerados: Conglomerado[] = [];  // plural y tipo correcto
  conglomerados2: Conglomerado2[] = [];  // plural y tipo correcto

  constructor(
    private fb: FormBuilder,
    private brigadistaService: BrigadistasService,
    private conglomeradoService: ConglomeradosService,
    private brigadaService: BrigadaService // INYECTAR
  ) {}


ngOnInit(): void {
  this.brigadaForm = this.fb.group({
    nombreBrigada: ['', Validators.required],
    fechaVisita: ['', Validators.required],
    jefeBrigada: ['', Validators.required],
    investigador: ['', Validators.required],
    CoInvestigador: ['', Validators.required],
    idConglomerado: ['', Validators.required]
  });

  this.cargarBrigadistas();
  this.cargarConglomerados();
  this.cargarBrigadistasConNombre(); // NUEVO
  this.cargarConglomeradosConNombre(); // NUEVO
}

  cargarBrigadistas(): void {
    this.brigadistaService.obtenerBrigadistas().subscribe({
      next: (data) => {
        this.brigadistas = data;

        // Filtrar por rol para llenar selectores u otros
        this.investigadores = this.brigadistas.filter(b => b.rol === 'Investigador');
        this.coinvestigadores = this.brigadistas.filter(b => b.rol === 'CoInvestigador');
      },
      error: (err) => {
        console.error('Error cargando brigadistas:', err);
      }
    });
  }

  cargarBrigadistasConNombre(): void {
  this.brigadaService.obtenerBrigadistasConNombre().subscribe({
    next: (data) => {
      this.brigadistasConNombre = data;
    },
    error: (err) => {
      console.error('Error cargando brigadistas con nombre:', err);
    }
  });
}

cargarConglomerados(): void {
  this.conglomeradoService.obtenerConglomerados().subscribe({
    next: (data) => {
      // Ordenar por id_conglomerado de menor a mayor
      this.conglomerados = data.sort((a, b) => a.id_conglomerado - b.id_conglomerado);
      console.log('Conglomerados cargados:', this.conglomerados);
    },
    error: (err) => {
      console.error('Error cargando conglomerados:', err);
    }
  });
}

cargarConglomeradosConNombre(): void {
  this.brigadaService.obtenerConglomeradosConIdentificador().subscribe({
    next: (data) => {
      this.conglomeradosConNombre = data;
    },
    error: (err) => {
      console.error('Error cargando conglomerados con nombre:', err);
    }
  });
}


  onSubmit(): void {
    if (this.brigadaForm.valid) {
      const form = this.brigadaForm.value;

      const nuevaBrigada = {
        nombre: form.nombreBrigada,
        fecha_visita: form.fechaVisita,
        id_jefe_brigada: form.jefeBrigada,
        id_investigador: form.investigador,
        id_coinvestigador: form.CoInvestigador,
        id_conglomerado: form.idConglomerado
      };

      this.brigadaService.crearBrigada(nuevaBrigada).subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          alert('Brigada registrada correctamente');
          this.brigadaForm.reset();
        },
        error: (err) => {
          console.error('Error al registrar brigada:', err);
          alert('Error al registrar brigada. Revisa los datos.');
        }
      });

    } else {
      this.brigadaForm.markAllAsTouched();
      alert('Formulario inválido. Por favor, corrija los errores.');
    }
  }

  eliminarBrigadista(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este brigadista? Esta acción no se puede deshacer.')) {
      this.brigadistaService.eliminarBrigadista(id).subscribe({
        next: () => {
          this.brigadistas = this.brigadistas.filter(b => b.id_usuario !== id);
          alert('Brigadista eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar brigadista:', err);
          alert('No se pudo eliminar el brigadista. Intenta nuevamente.');
        }
      });
    }
  }

//   eliminarConglomerado(id: number): void {
//     if (confirm('¿Estás seguro de que deseas eliminar este conglomerado?')) {
//       // Aquí debes llamar a tu servicio de conglomerados para eliminar
//       this.conglomeradoService.eliminarConglomerado(id).subscribe({
//         next: () => {
//           this.conglomerados = this.conglomerados.filter(c => c.id_conglomerado !== id);
//           alert('Conglomerado eliminado correctamente');
//         },
//         error: (err) => {
//           console.error('Error al eliminar conglomerado:', err);
//           alert('No se pudo eliminar el conglomerado. Intenta nuevamente.');
//         }
//       });
//     }
//   }
// }


  eliminarConglomerado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este conglomerado? Esta acción no se puede deshacer.')) {
      this.conglomeradoService.eliminarConglomerado(id).subscribe({
        next: () => {
          // Filtrar y eliminar el conglomerado de la lista local
          this.conglomerados = this.conglomerados.filter(c => c.id_conglomerado !== id);
          alert('Conglomerado eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar conglomerado:', err);
          alert('No se pudo eliminar el conglomerado. Intenta nuevamente.');
        }
      });
    }
  }
}
