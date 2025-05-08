export interface Brigadista {
    id_usuario: number;
    nombre: string;
    correo: string;
    direccion: string;
    telefono: string;
    rol: 'Investigador' | 'CoInvestigador';
}
