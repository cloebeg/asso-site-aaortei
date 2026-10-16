import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: 'textile' | 'goodies' | 'digital';
  helloassoUrl?: string; // lien HelloAsso propre à chaque produit
}

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boutique.html',
  styleUrl: './boutique.scss',
})
export default class BoutiqueComponent {

  // lien utilisé tant qu'un produit n'a pas encore son propre lien
  readonly defaultHelloassoUrl = 'https://www.helloasso.com';

  searchQuery = '';
  activeFilter: 'tout' | 'textile' | 'goodies' | 'digital' = 'tout';

  filters: ('tout' | 'textile' | 'goodies' | 'digital')[] = ['tout', 'textile', 'goodies', 'digital'];

  products: Product[] = [
    {
      name: 'T-shirt simple',
      description: "Un t-shirt aux couleurs de l'asso avec notre logo.",
      price: 25, emoji: '🌋', category: 'textile',
      helloassoUrl: '', // colle le lien ici
    },
    {
      name: 'T-shirt personalisé',
      description: "Un t-shirt avec une vachette à votre effigie et votre prénom. + fichier png de ta vache perso.",
      price: 35, emoji: '🌋', category: 'textile',
      helloassoUrl: '',
    },
    {
      name: 'Tote bag',
      description: "Un tote bag avec notre logo et à notre style.",
      price: 10, emoji: '🌋', category: 'textile',
      helloassoUrl: '',
    },
    {
      name: 'Casquette',
      description: "Une casquette avec notre logo et à notre style.",
      price: 15, emoji: '🌋', category: 'textile',
      helloassoUrl: '',
    },
    {
      name: 'Gourde',
      description: "Une gourde réutilisable aux couleurs de l'asso.",
      price: 15, emoji: '🌋', category: 'goodies',
      helloassoUrl: '',
    },
    {
      name: 'Sticker',
      description: "Sticker du logo de notre asso.",
      price: 2, emoji: '🌋', category: 'goodies',
      helloassoUrl: '',
    },
    {
      name: 'Broderie',
      description: "Une broderie de notre logo.",
      price: 6, emoji: '🌋', category: 'textile',
      helloassoUrl: '',
    },
    {
      name: "Pin's",
      description: "Des pins de notre logo.",
      price: 4, emoji: '🌋', category: 'goodies',
      helloassoUrl: '',
    },
    {
      name: 'Porte-clés peluche',
      description: "Un porte-clés en peluche de notre mascotte.",
      price: 15, emoji: '🌋', category: 'goodies',
      helloassoUrl: '',
    },
    {
      name: 'Vache personnalisée',
      description: "Fichier png de ta vache perso selon tes préférences. *Environ 10 Jours d'attente",
      price: 10, emoji: '🌋', category: 'digital',
      helloassoUrl: '',
    },
  ];

  get filteredProducts(): Product[] {
    return this.products.filter(p => {
      const matchCategory = this.activeFilter === 'tout' || p.category === this.activeFilter;
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  setFilter(filter: 'tout' | 'textile' | 'goodies' | 'digital') {
    this.activeFilter = filter;
  }
}
