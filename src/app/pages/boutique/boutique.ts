import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FALLBACK_IMAGE, Product, PRODUCTS } from './products.data';

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
  
    products: Product[] = PRODUCTS;
  
    onImageError(event: Event) {
      (event.target as HTMLImageElement).src = FALLBACK_IMAGE;
    }

  get filteredProducts(): Product[] {
    const search = this.normalizeSearch(this.searchQuery);
  
    return this.products.filter(p => {
      const matchCategory = this.activeFilter === 'tout' || p.category === this.activeFilter;
  
      const productName = this.normalizeSearch(p.name);
  
      const matchSearch = !search || productName.includes(search);
  
      return matchCategory && matchSearch;
    });
  }
  
  private normalizeSearch(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  setFilter(filter: 'tout' | 'textile' | 'goodies' | 'digital') {
    this.activeFilter = filter;
  }

  goToProduct(slug: string) {
    this.router.navigate(['/boutique/product', slug]);
  }
}