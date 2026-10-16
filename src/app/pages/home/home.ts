import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class HomeComponent {
  private baseLogos = [
    'logos/logo1.png',
    'logos/logo2.png',
    'logos/logo3.png',
    'logos/logo4.png',
    'logos/logo5.png',
  ];

  logos = [...this.baseLogos, ...this.baseLogos, ...this.baseLogos];
  groups = [1, 2];
}
