import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Product {
  name: string;
  description: string;
  price: number;
  emoji: string;
  slug: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export default class ProductComponent implements OnInit {

  product: Product | undefined;

  private products: Product[] = [
    { name: 'T-shirt simple',      slug: 't-shirt-simple',      description: "Un t-shirt aux couleurs de l'asso avec notre logo.", price: 25, emoji: '🌋' },
    { name: 'T-shirt personalisé', slug: 't-shirt-personalise', description: "Un t-shirt avec une vachette à votre effigie et votre prénom. + fichier png de ta vache perso.", price: 35, emoji: '🌋' },
    { name: 'Tote bag',            slug: 'tote-bag',            description: "Un tote bag avec notre logo et à notre style.", price: 10, emoji: '🌋' },
    { name: 'Casquette',           slug: 'casquette',           description: "Une casquette avec notre logo et à notre style.", price: 15, emoji: '🌋' },
    { name: 'Gourde',              slug: 'gourde',              description: "Une gourde réutilisable aux couleurs de l'asso.", price: 15, emoji: '🌋' },
    { name: 'Sticker',             slug: 'sticker',             description: "Sticker du logo de notre asso.", price: 2, emoji: '🌋' },
    { name: 'Broderie',            slug: 'broderie',            description: "Une broderie de notre logo.", price: 6, emoji: '🌋' },
    { name: "Pin's",               slug: 'pins',                description: "Des pins de notre logo.", price: 4, emoji: '🌋' },
    { name: 'Porte-clés peluche',  slug: 'porte-cles-peluche', description: "Un porte-clés en peluche de notre mascotte.", price: 15, emoji: '🌋' },
    { name: 'Vache personnalisée', slug: 'vache-personnalisee', description: "Fichier png de ta vache perso selon tes préférences. *Environ 10 Jours d'attente", price: 10, emoji: '🌋' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.product = this.products.find(p => p.slug === slug);
    if (!this.product) this.router.navigate(['/boutique']);
  }

  back() {
    this.router.navigate(['/boutique']);
  }
}