import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';
  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      document.body.classList.add('login-background');
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.classList.remove('login-background');
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.http.get<any[]>('assets/data/usuarios.json').pipe(take(1)).subscribe({
      next: users => {
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          if(this.isBrowser) {
            localStorage.setItem('loggedUser', JSON.stringify({ username: user.username, role: user.role }));
          }
          this.router.navigate(['/']); // Redirigir al inicio
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      },
      error: err => {
        console.error('Error al cargar usuarios:', err);
        this.errorMessage = 'Error en el servidor.';
      }
    });
  }
}
