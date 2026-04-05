import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})

export default class NavComponent {
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  navLinks = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/presentation', label: 'Présentation', icon: '👥' },
    { path: '/planning', label: 'Planning', icon: '📅' },
    { path: '/photos', label: 'Photos', icon: '📷' },
    { path: '/boutique', label: 'Boutique', icon: '🛍️' },
    { path: '/contact', label: 'Contact', icon: '✉️' },
  ];
}
