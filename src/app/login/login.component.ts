import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { take } from 'rxjs';
import { FirabaseAuthService } from '../servicios/firabase-auth.service';
import { error } from 'node:console';

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

  private router = inject(Router);
  private firabaseAuth = inject(FirabaseAuthService);
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

    this.firabaseAuth.login(username, password).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
       this.errorMessage = error;
      }
    )
  }
}
