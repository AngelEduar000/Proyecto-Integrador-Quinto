import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
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
    if(!this.isBrowser) { return of(null); }

    const userDoc = doc(this.firestore, `usuarios/${idUser}`);
    return from(getDoc(userDoc)).pipe(
      switchMap((snap) => {
        if(snap.exists()) {
          return of({ idUser, ...snap.data() });
        } else {
          throw new Error('Usuario no existe en la base de datos');
        }
      })
    );
  }

  getAllUsers(): Observable<any[]> {
    if (!this.isBrowser) { return of([]); }

    const usersCollection = collection(this.firestore, 'usuarios');
    return from(getDocs(usersCollection)).pipe(
      switchMap((querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return of(users);
      })
    );
  }

  createUser(data: any): Observable<any> {
    if(!this.isBrowser) { return of(null); }

    return from(createUserWithEmailAndPassword(this.auth, data.email, data.password)).pipe(
      switchMap((userCreated) => {
        const idUser = userCreated.user.uid;
        const userDoc = doc(this.firestore, `usuarios/${idUser}`);
        return from(setDoc(userDoc, { id: idUser, ...data }));
      })
    );
  }
}
