import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export default class NavComponent {
  navLinks = [
    { path: '/', label: 'Accueil', icon: 'nav/nav_home.png' },
    { path: '/presentation', label: 'Présentation', icon: 'nav/nav_members.png' },
    { path: '/planning', label: 'Planning', icon: 'nav/nav_planning.png' },
    { path: '/photos', label: 'Photos', icon: 'nav/nav_memories.png' },
    { path: '/boutique', label: 'Boutique', icon: 'nav/nav_shop.png' },
    { path: '/contact', label: 'Contact', icon: 'nav/nav_contact.png' },
  ];
}
