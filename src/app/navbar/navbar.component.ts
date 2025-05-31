import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../servicios/firabase-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  username = '';
  userRole = '';

  private authService = inject(FirebaseAuthService);
  private router = inject(Router);

  constructor() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.username = user['name'] || user['email'] || 'Usuario';
        this.userRole = user['role'] || '';
      } else {
        this.isLoggedIn = false;
        this.username = '';
        this.userRole = '';
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
