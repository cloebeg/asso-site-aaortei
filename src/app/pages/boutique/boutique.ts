import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface Product {
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: 'textile' | 'goodies' | 'digital';
  slug: string;
}

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './boutique.html',
  styleUrl: './boutique.scss',
})
export default class BoutiqueComponent {

  constructor(private router: Router) {}

  searchQuery = '';
  activeFilter: 'tout' | 'textile' | 'goodies' | 'digital' = 'tout';

  filters: ('tout' | 'textile' | 'goodies' | 'digital')[] = ['tout', 'textile', 'goodies', 'digital'];

  products: Product[] = [
    { name: 'T-shirt simple',      slug: 't-shirt-simple',      description: "Un t-shirt aux couleurs de l'asso avec notre logo.", price: 25, emoji: '🌋', category: 'textile' },
    { name: 'T-shirt personalisé', slug: 't-shirt-personalise', description: "Un t-shirt avec une vachette à votre effigie et votre prénom. + fichier png de ta vache perso.", price: 35, emoji: '🌋', category: 'textile' },
    { name: 'Tote bag',            slug: 'tote-bag',            description: "Un tote bag avec notre logo et à notre style.", price: 10, emoji: '🌋', category: 'textile' },
    { name: 'Casquette',           slug: 'casquette',           description: "Une casquette avec notre logo et à notre style.", price: 15, emoji: '🌋', category: 'textile' },
    { name: 'Gourde',              slug: 'gourde',              description: "Une gourde réutilisable aux couleurs de l'asso.", price: 15, emoji: '🌋', category: 'goodies' },
    { name: 'Sticker',             slug: 'sticker',             description: "Sticker du logo de notre asso.", price: 2, emoji: '🌋', category: 'goodies' },
    { name: 'Broderie',            slug: 'broderie',            description: "Une broderie de notre logo.", price: 6, emoji: '🌋', category: 'textile' },
    { name: "Pin's",               slug: 'pins',                description: "Des pins de notre logo.", price: 4, emoji: '🌋', category: 'goodies' },
    { name: 'Porte-clés peluche',  slug: 'porte-cles-peluche', description: "Un porte-clés en peluche de notre mascotte.", price: 15, emoji: '🌋', category: 'goodies' },
    { name: 'Vache personnalisée', slug: 'vache-personnalisee', description: "Fichier png de ta vache perso selon tes préférences. *Environ 10 Jours d'attente", price: 10, emoji: '🌋', category: 'digital' },
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

  goToProduct(slug: string) {
    this.router.navigate(['/boutique/product', slug]);
  }
}