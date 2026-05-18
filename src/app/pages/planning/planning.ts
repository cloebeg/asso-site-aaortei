import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HelloAssoEvent, HelloAssoService } from '../../shared/services/HelloAssoService';
import { LoadingDotsComponent } from '../../shared/components/loading-dots/loading-dots';

type FilterTab = 'all' | 'upcoming' | 'past';

@Component({
  selector: 'app-planning',
  imports: [CommonModule, DatePipe, LoadingDotsComponent],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
  standalone: true,
})
export default class PlanningComponent implements OnInit {
  private helloAssoService = inject(HelloAssoService);

  events = signal<HelloAssoEvent[]>([]);
  activeFilter = signal<FilterTab>('upcoming');
  loading = signal(true);

  currentYear = new Date().getFullYear();

  filteredEvents = computed(() => {
    const filter = this.activeFilter();
    const all = this.events();
    if (filter === 'all') return all;
    if (filter === 'upcoming')
      return all.filter((e) => e.status === 'upcoming' || e.status === 'ongoing');
    return all.filter((e) => e.status === 'past');
  });

  ngOnInit() {
    this.helloAssoService.getEvents().subscribe((events) => {
      this.events.set(events);
      this.loading.set(false);
    });
  }

  setFilter(f: FilterTab) {
    this.activeFilter.set(f);
  }

  getSeatClass(event: HelloAssoEvent): string {
    if (event.status === 'past') return 'sold-out';
    const ratio = event.remainingSeats / event.totalSeats;
    if (event.remainingSeats === 0) return 'sold-out';
    if (ratio < 0.1) return 'critical';
    if (ratio < 0.3) return 'low';
    return 'available';
  }

  getSeatLabel(event: HelloAssoEvent): string {
    if (event.status === 'past') return 'Événement passé';
    if (event.remainingSeats === 0) return 'Complet';
    if (event.remainingSeats <= 20) return `${event.remainingSeats} places restantes`;
    return `${event.remainingSeats} places dispo`;
  }

  formatDateRange(event: HelloAssoEvent): string {
    const start = event.startDate;
    const end = event.endDate;
    const dayStart = start.getDate().toString().padStart(2, '0');
    const dayEnd = end.getDate().toString().padStart(2, '0');
    const months = [
      'jan',
      'fév',
      'mars',
      'avr',
      'mai',
      'juin',
      'juil',
      'août',
      'sept',
      'oct',
      'nov',
      'déc',
    ];
    const monthStart = months[start.getMonth()];
    const monthEnd = months[end.getMonth()];
    const hours = `${start.getHours().toString().padStart(2, '0')}h → ${end.getHours().toString().padStart(2, '0')}h`;
    if (start.getDate() === end.getDate()) {
      return `${dayStart} ${monthStart} ${start.getFullYear()} — ${hours}`;
    }
    return `${dayStart} ${monthStart} → ${dayEnd} ${monthEnd} ${end.getFullYear()}`;
  }

  getDaysUntil(event: HelloAssoEvent): string | null {
    if (event.status === 'past') return null;
    if (event.status === 'ongoing') return 'En cours';
    const diff = Math.ceil((event.startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Demain';
    return `J-${diff}`;
  }

  protected readonly Date = Date;
}
