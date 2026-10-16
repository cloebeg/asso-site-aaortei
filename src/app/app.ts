import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from './shared/header/header';
import FooterComponent from './shared/footer/footer';
import NavComponent from './shared/nav/nav';
import ScrollTopComponent from './shared/scroll-top/scroll-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent, FooterComponent, ScrollTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('asso-site');
}
