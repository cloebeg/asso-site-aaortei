export type ProductCategory = 'textile' | 'goodies' | 'digital';

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  /** Photo du produit, à déposer dans public/boutique/<slug>.png */
  image: string;
  /** Lien de la page HelloAsso du produit (à remplacer par les vrais liens) */
  helloAssoUrl: string;
}

// TODO : remplacer chaque helloAssoUrl par le lien réel du produit sur HelloAsso
const HELLOASSO_URL = 'https://www.helloasso.com/';

export const PRODUCTS: Product[] = [
  { slug: 't-shirt-simple',      name: 'T-shirt simple',      price: 25, category: 'textile', description: "Un t-shirt aux couleurs de l'asso avec notre logo.", image: 'boutique/t-shirt-simple.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 't-shirt-personalise', name: 'T-shirt personalisé', price: 35, category: 'textile', description: "Un t-shirt avec une vachette à votre effigie et votre prénom. + fichier png de ta vache perso.", image: 'boutique/t-shirt-personalise.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'tote-bag',            name: 'Tote bag',            price: 10, category: 'textile', description: "Un tote bag avec notre logo et à notre style.", image: 'boutique/tote-bag.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'casquette',           name: 'Casquette',           price: 15, category: 'textile', description: "Une casquette avec notre logo et à notre style.", image: 'boutique/casquette.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'gourde',              name: 'Gourde',              price: 15, category: 'goodies', description: "Une gourde réutilisable aux couleurs de l'asso.", image: 'boutique/gourde.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'sticker',             name: 'Sticker',             price: 2,  category: 'goodies', description: "Sticker du logo de notre asso.", image: 'boutique/sticker.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'broderie',            name: 'Broderie',            price: 6,  category: 'textile', description: "Une broderie de notre logo.", image: 'boutique/broderie.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'pins',                name: "Pin's",               price: 4,  category: 'goodies', description: "Des pins de notre logo.", image: 'boutique/pins.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'porte-cles-peluche',  name: 'Porte-clés peluche',  price: 15, category: 'goodies', description: "Un porte-clés en peluche de notre mascotte.", image: 'boutique/porte-cles-peluche.png', helloAssoUrl: HELLOASSO_URL },
  { slug: 'vache-personnalisee', name: 'Vache personnalisée', price: 10, category: 'digital', description: "Fichier png de ta vache perso selon tes préférences. *Environ 10 Jours d'attente", image: 'boutique/vache-personnalisee.png', helloAssoUrl: HELLOASSO_URL },
];

export const FALLBACK_IMAGE = 'logo_aaortei.png';
