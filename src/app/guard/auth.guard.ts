import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { FirebaseAuthService } from '../servicios/firabase-auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);
  private firebaseAuth = inject(FirebaseAuthService);

  canActivate(): Observable<boolean | UrlTree> {
    return this.firebaseAuth.authState$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
