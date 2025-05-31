import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Inject } from '@angular/core';
import { FirebaseAuthService } from '../servicios/firabase-auth.service';
import { onAuthStateChanged, User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;
  username: string = '';

  private authService = inject(FirebaseAuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      onAuthStateChanged(this.authService['auth'], (user: User | null) => {
        if (user) {
          this.isLoggedIn = true;
          this.username = user.displayName || user.email || 'Usuario';
        } else {
          this.isLoggedIn = false;
          this.username = '';
        }
      });
    }
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
