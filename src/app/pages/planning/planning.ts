import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type EventStatus = 'upcoming' | 'ongoing' | 'past';

interface EventItem {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  image: string;
  availablePlaces: number;
  totalPlaces: number;
  ticketAvailable: boolean;
  ticketUrl?: string;
  price?: string;
  category?: string;
}

@Component({
  selector: 'app-planning',
  imports: [CommonModule],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export default class Planning {
  events: EventItem[] = [
    {
      id: 1,
      title: 'Soirée de rentrée AAORTEi',
      startDate: new Date('2026-10-16T20:00:00'),
      endDate: new Date('2026-10-17T02:00:00'),
      location: 'Clermont-Ferrand',
      description:
        'Une grande soirée pour se retrouver, accueillir les nouveaux étudiants et lancer l’année comme il se doit. Musique, rencontres, animations et bonne ambiance au programme !',
      image: 'assets/events/rentree.jpg',
      availablePlaces: 42,
      totalPlaces: 80,
      ticketAvailable: true,
      ticketUrl: 'https://www.helloasso.com/',
      price: '5 €',
      category: 'Soirée',
    },

    {
      id: 2,
      title: 'Week-end ski & montagne',
      startDate: new Date('2026-11-21T08:30:00'),
      endDate: new Date('2026-11-22T18:00:00'),
      location: 'Super-Besse',
      description:
        'Un week-end à la montagne avec l’AAORTEi ! Transport, activités, moments conviviaux et évidemment beaucoup de neige au programme.',
      image: 'assets/events/ski.jpg',
      availablePlaces: 60,
      totalPlaces: 60,
      ticketAvailable: false,
      price: 'À venir',
      category: 'Sortie',
    },

    {
      id: 3,
      title: 'Journée sportive inter-écoles',
      startDate: new Date('2026-10-04T14:00:00'),
      endDate: new Date('2026-10-04T18:00:00'),
      location: 'Aubière',
      description:
        'Une après-midi sportive et conviviale réunissant les étudiants des différentes écoles autour de plusieurs activités.',
      image: 'assets/events/sport.jpg',
      availablePlaces: 17,
      totalPlaces: 60,
      ticketAvailable: true,
      ticketUrl: 'https://www.helloasso.com/',
      price: '3 €',
      category: 'Sport',
    },

    {
      id: 4,
      title: 'Apéro de fin d’année',
      startDate: new Date('2026-06-26T19:00:00'),
      endDate: new Date('2026-06-26T23:30:00'),
      location: 'Clermont-Ferrand',
      description:
        'Un dernier moment tous ensemble avant les vacances pour clôturer l’année autour d’un apéro convivial.',
      image: 'assets/events/apero.jpg',
      availablePlaces: 0,
      totalPlaces: 80,
      ticketAvailable: false,
      price: 'Événement terminé',
      category: 'Convivialité',
    },
  ];

  selectedEvent: EventItem | null = null;

  constructor() {
    const activeEvent = this.events.find((event) => {
      const status = this.getEventStatus(event);

      return status === 'ongoing' || status === 'upcoming';
    });

    this.selectedEvent = activeEvent ?? this.events[0];
  }

  getEventStatus(event: EventItem): EventStatus {
    const now = new Date();

    if (now < event.startDate) {
      return 'upcoming';
    }

    if (now >= event.startDate && now <= event.endDate) {
      return 'ongoing';
    }

    return 'past';
  }

  get upcomingEvents(): EventItem[] {
    return this.events.filter((event) => this.getEventStatus(event) === 'upcoming');
  }

  get ongoingEvents(): EventItem[] {
    return this.events.filter((event) => this.getEventStatus(event) === 'ongoing');
  }

  get pastEvents(): EventItem[] {
    return this.events.filter((event) => this.getEventStatus(event) === 'past');
  }

  selectEvent(event: EventItem): void {
    this.selectedEvent = event;
  }

  getAvailability(event: EventItem): number {
    if (event.totalPlaces === 0) {
      return 0;
    }

    return Math.round((event.availablePlaces / event.totalPlaces) * 100);
  }

  getPlacesText(event: EventItem): string {
    if (this.getEventStatus(event) === 'past') {
      return 'Événement terminé';
    }

    return `${event.availablePlaces} / ${event.totalPlaces} places restantes`;
  }

  getStatusLabel(event: EventItem): string {
    const status = this.getEventStatus(event);

    switch (status) {
      case 'upcoming':
        return event.ticketAvailable ? 'Billetterie en ligne' : 'Bientôt disponible';

      case 'ongoing':
        return 'En cours';

      case 'past':
        return 'Terminé';
    }
  }

  getStatusClass(event: EventItem): string {
    return this.getEventStatus(event);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}
