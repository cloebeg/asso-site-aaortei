import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  description: string;
  price: number;
  image?: string;
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
      name: 'Pull AAORTEi',
      description: "Un pull aux couleurs de l'asso avec notre logo.",
      price: 25, category: 'textile',
      image: 'produits/visuel_a_venir.png',
      helloassoUrl: '', // colle le lien ici
    },

    {
      name: 'Combar AAORTEi',
      description: "Une combar au thème de notre asso.",
      price: 70, category: 'textile',
      image: 'produits/combar_aaortei.png',
      helloassoUrl: '',
    },

    {
      name: 'Gourde',
      description: "Une gourde réutilisable aux couleurs de l'asso.",
      price: 10, category: 'goodies',
      image: 'produits/visuel_a_venir.png',
      helloassoUrl: '',
    },

   {
      name: 'Vache personnalisée',
      description: "Fichier png de ta vache perso selon tes préférences. *Environ 10 Jours d'attente",
      price: 5, category: 'digital',
      image: 'produits/vacheperso.png',
      helloassoUrl: '',
    },

    {
      name: 'Patch AAORTEi',
      description: "Broderie du logo de notre asso.",
      price: 4, category: 'textile',
      image: 'produits/broderie_aaortei.png',
      helloassoUrl: '',
    },

   {
      name: "Pin's AAORTEi",
      description: "Pin's de notre logo.",
      price: 2, category: 'goodies',
      image: 'produits/pins_aaortei.png',
      helloassoUrl: '',
    },

    {
      name: 'Patch VODY',
      description: "Une broderie de notre vachette dans une VODY.",
      price: 3.50, category: 'textile',
      image: 'produits/broderie_vody.png',
      helloassoUrl: '',
    },



    {
      name: "Pin's VODY",
      description: "Pin's de notre vachette dans une VODY.",
      price: 2, category: 'goodies',
      image: 'produits/pins_vody.png',
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
