import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit, OnDestroy{

  imagenes: string[] = [
    '/imagenes/balsa.jpg',
    '/imagenes/cedro.jpg',
    '/imagenes/ceiba.jpg',
    '/imagenes/chuchuhuasi.jpg',
    '/imagenes/forest.jpg',
    '/imagenes/gualanday.jpg',
    '/imagenes/guayacan.jpg',
  ]

  currentIndex = 0;
  intervalId: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startCarousel();
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextImage(false);
    }, 5000);
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.startCarousel();
  }

  nextImage(reset: boolean = true) {
    this.currentIndex = (this.currentIndex + 1) % this.imagenes.length;
    if (reset) this.resetTimer();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.imagenes.length) % this.imagenes.length;
    this.resetTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
