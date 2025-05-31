import { Component, OnInit, OnDestroy, Inject, inject, PLATFORM_ID  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs/operators';
import { FirebaseAuthService } from '../servicios/firabase-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  private router = inject(Router);
  private firebaseAuth = inject(FirebaseAuthService);
  private fb = inject(FormBuilder);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.isBrowser) {
      document.body.classList.add('login-background');

      // Evitar volver al login si ya inició sesión
      this.firebaseAuth.authState$.pipe(take(1)).subscribe(user => {
        if (user) {
          this.router.navigate(['/']);
        }
      });
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

    this.firebaseAuth.login(username, password).pipe(take(1)).subscribe(
      data => {
        console.log('Login exitoso', data);
        this.router.navigate(['/']);
      },
      err => {
        this.errorMessage = err.message || 'Error al iniciar sesión';
      }
    );
  }
}
