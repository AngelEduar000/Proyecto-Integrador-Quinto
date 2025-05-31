import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirabaseAuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private isBrowser = false;
  readonly authState$ = authState(this.auth);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string) {
    if (!this.isBrowser) return of(null); // Protege contra SSR

    return from(signInWithEmailAndPassword(this.auth, username, password)).pipe(
      switchMap((cred) => {
        console.log(cred);
        const uid = cred.user.uid;
        const userDoc = doc(this.firestore, `usuarios/${uid}`);
        return from(getDoc(userDoc)).pipe(
          switchMap((snap) => {
            if (snap.exists()) {
              return of({ uid, ...snap.data() });
            } else {
              throw new Error('Usuario no encontrado en Firestore');
            }
          })
        );
      })
    );
  }
}
