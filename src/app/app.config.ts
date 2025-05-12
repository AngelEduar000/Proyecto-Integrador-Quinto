import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp({
      projectId: "inventario-forestal-b4499",
      appId: "1:954462364792:web:07e8139456e96d1456b98d",
      storageBucket: "inventario-forestal-b4499.firebasestorage.app",
      apiKey: "AIzaSyBoHoXKaetjWUbqOzDoF2sufccASjSualk",
      authDomain: "inventario-forestal-b4499.firebaseapp.com",
      messagingSenderId: "954462364792"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
