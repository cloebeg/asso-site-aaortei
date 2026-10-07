import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FALLBACK_IMAGE, Product, PRODUCTS } from '../products.data';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export default class ProductComponent implements OnInit {

  product: Product | undefined;
  imageSrc = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.product = PRODUCTS.find(p => p.slug === slug);
    if (!this.product) {
      this.router.navigate(['/boutique']);
      return;
    }
    this.imageSrc = this.product.image;
  }

  // Si la photo du produit n'existe pas encore, on affiche le logo de l'asso
  onImageError() {
    this.imageSrc = FALLBACK_IMAGE;
  }

  back() {
    this.router.navigate(['/boutique']);
  }
}
