import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false; // Añadimos esta propiedad
  username = 'Usuario'; // Valor por defecto o puedes dejarlo vacío ''

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    console.log('Sesión cerrada');
    // Aquí deberías redirigir al login:
    // this.router.navigate(['/login']);
  }

  // Método de ejemplo para simular login
  simulateLogin(): void {
    this.isLoggedIn = true;
    this.username = 'UsuarioEjemplo';
  }
}