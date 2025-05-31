import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { from, map, of, switchMap } from 'rxjs';
import { signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private isBrowser = false;
  readonly authState$ = authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of(null);
      const userDoc = doc(this.firestore, `usuarios/${user.uid}`);
      return from(getDoc(userDoc)).pipe(
        map(snap => (snap.exists() ? { uid: user.uid, ...snap.data() } : null))
      );
    })
  );
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string) {
    if (!this.isBrowser) return of(null);

    return from(signInWithEmailAndPassword(this.auth, username, password)).pipe(
      switchMap((cred) => {
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

logout() {
  return from(signOut(this.auth));
}

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
