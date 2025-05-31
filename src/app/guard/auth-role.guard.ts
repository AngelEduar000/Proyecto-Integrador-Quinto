import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { FirebaseAuthService } from '../servicios/firabase-auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private authService: FirebaseAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles = route.data['roles'] as string[];

    return this.authService.authState$.pipe(
      map(user => {
        if (!user) return this.router.createUrlTree(['/login']);
        return allowedRoles.includes((user as any).role)
          ? true
          : this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}
