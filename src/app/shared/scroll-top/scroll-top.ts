import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
})
export default class ScrollTopComponent {
  visible = false;

  // le bouton apparaît quand on a scrollé de plus de 400px
  @HostListener('window:scroll')
  onScroll(): void {
    this.visible = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
