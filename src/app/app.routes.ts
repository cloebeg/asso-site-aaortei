import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home') },
  { path: 'presentation', loadComponent: () => import('./pages/presentation/presentation') },
  { path: 'planning', loadComponent: () => import('./pages/planning/planning') },
  { path: 'photos', loadComponent: () => import('./pages/photos/photos') },
  { path: 'boutique', loadComponent: () => import('./pages/boutique/boutique') },
  { path: 'boutique/product/:slug', loadComponent: () => import('./pages/boutique/product/product') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact') },
  { path: '**', redirectTo: '' }
];