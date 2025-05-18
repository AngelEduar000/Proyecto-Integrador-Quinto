import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getUserById(idUser: string): Observable<any> {
    if(this.isBrowser) { return of(null) }
    const userDoc = doc(this.firestore, `usuarios/${idUser}`)
    return from(getDoc(userDoc)).pipe(
      switchMap((snap) => {
        if(snap.exists) {
          return of({idUser, ...snap.data});
        } else {
          throw new Error('Usuario no existe en la base de datos');
        }
      })
    );
  }

  getAllUser() {
    if(this.isBrowser) { return of(null) }
    const userDoc = doc(this.firestore, `usuarios`)
    return from(getDoc(userDoc)).pipe(
      switchMap((snap) => {
        if(snap.exists) {
          return of({...snap.data});
        } else {
          throw new Error('Usuario no existe en la base de datos');
        }
      })
    );
  }

  createUser(data: any): Observable<any> {
    if(!this.isBrowser) { return of(null) }

    console.log('Entre a llamar el servicio')

    return from(createUserWithEmailAndPassword(this.auth, data.email, 'PI1234*')).pipe(
      switchMap((userCreated) => {
        const idUser = userCreated.user.uid;
        const userDoc = doc(this.firestore, `usuarios`, idUser);
        return from(setDoc(userDoc, {id: idUser, ...data}));
      })
    )
  }
}
