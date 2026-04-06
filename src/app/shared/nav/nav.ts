import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export default class NavComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  navLinks = [
    { path: '/', label: 'Accueil', icon: 'nav/nav_home.png' },
    { path: '/members', label: 'Nos membres', icon: 'nav/nav_members.png' },
    { path: '/planning', label: 'Planning', icon: 'nav/nav_planning.png' },
    { path: '/memories', label: 'Memories', icon: 'nav/nav_memories.png' },
    { path: '/shop', label: 'Boutique', icon: 'nav/nav_shop.png' },
    { path: '/contact', label: 'Contact', icon: 'nav/nav_contact.png' },
  ];
}
