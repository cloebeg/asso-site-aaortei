import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export type EventStatus = 'upcoming' | 'ongoing' | 'past';

export interface HelloAssoEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  place: string;
  type: string; // Techno, Acid, etc.
  totalSeats: number;
  remainingSeats: number;
  imageUrl?: string;
  ticketUrl?: string;
  isSecret?: boolean;
  status: EventStatus;
}

// Structure brute de l'API HelloAsso v5
interface HelloAssoApiForm {
  id: number;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  place?: { name?: string; city?: string };
  bannerUrl?: string;
  url?: string;
  remainingEntries?: number;
  totalEntries?: number;
  tags?: string[];
  activityType?: { label: string };
}

interface HelloAssoApiResponse {
  data: HelloAssoApiForm[];
  pagination: { totalCount: number; pageIndex: number; totalPages: number };
}

@Injectable({ providedIn: 'root' })
export class HelloAssoService {
  private http = inject(HttpClient);

  // 🔧 À configurer avec vos vraies credentials HelloAsso
  private readonly ORG_SLUG = 'aaorte'; // Slug de votre organisation
  private readonly CLIENT_ID = 'YOUR_CLIENT_ID';
  private readonly CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
  private readonly API_BASE = 'https://api.helloasso.com/v5';

  private tokenSubject = new BehaviorSubject<string | null>(null);

  // ─── Authentification OAuth2 ───────────────────────────────────────────────
  private authenticate(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.CLIENT_ID);
    body.set('client_secret', this.CLIENT_SECRET);

    return this.http
      .post<{ access_token: string }>('https://api.helloasso.com/oauth2/token', body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      })
      .pipe(
        map((res) => res.access_token),
        tap((token) => this.tokenSubject.next(token))
      );
  }

  // ─── Récupération des événements ───────────────────────────────────────────
  getEvents(): Observable<HelloAssoEvent[]> {
    // 💡 Pour activer la vraie API : décommenter le bloc ci-dessous et supprimer le return mockEvents
    /*
    return this.authenticate().pipe(
      switchMap(token =>
        this.http.get<HelloAssoApiResponse>(
          `${this.API_BASE}/organizations/${this.ORG_SLUG}/forms?formType=Event&pageSize=20`,
          { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
        )
      ),
      map(res => res.data.map(f => this.mapApiFormToEvent(f))),
      catchError(() => of(MOCK_EVENTS))
    );
    */

    return of(MOCK_EVENTS);
  }

  private mapApiFormToEvent(f: HelloAssoApiForm): HelloAssoEvent {
    const start = new Date(f.startDate);
    const end = new Date(f.endDate);
    const now = new Date();
    let status: EventStatus = 'upcoming';
    if (end < now) status = 'past';
    else if (start <= now && end >= now) status = 'ongoing';

    return {
      id: String(f.id),
      title: f.title,
      description: f.description || '',
      startDate: start,
      endDate: end,
      place: f.place?.name || f.place?.city || 'Lieu secret',
      type: f.tags?.join(' / ') || f.activityType?.label || 'Soirée',
      totalSeats: f.totalEntries ?? 300,
      remainingSeats: f.remainingEntries ?? 0,
      imageUrl: f.bannerUrl,
      ticketUrl: f.url,
      status,
    };
  }
}

const now = new Date();
const d = (offsetDays: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

const MOCK_EVENTS: HelloAssoEvent[] = [
  {
    id: '1',
    title: 'Warehouse Night #12',
    description: 'La douzième édition de notre soirée emblématique dans les entrepôts de Lyon.',
    startDate: d(14),
    endDate: d(15),
    place: 'Lyon',
    type: 'Techno / Hardtekno / IRL / DNB',
    totalSeats: 400,
    remainingSeats: 42,
    ticketUrl: '#',
    isSecret: false,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Summer Rave 2025',
    description: 'Une nuit estivale en plein air, perdue quelque part dans la nature.',
    startDate: d(29),
    endDate: d(30),
    place: 'Lieu secret',
    type: 'Acid / Rave',
    totalSeats: 250,
    remainingSeats: 250,
    ticketUrl: '#',
    isSecret: true,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Back To School Party',
    description: 'La rentrée ça se fête. Ambiance renoi et hard.',
    startDate: d(3),
    endDate: d(4),
    place: 'TBA',
    type: 'Techno / Hard',
    totalSeats: 180,
    remainingSeats: 12,
    ticketUrl: '#',
    isSecret: false,
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Warehouse Night #11',
    description: "L'édition précédente — une nuit mémorable.",
    startDate: d(-30),
    endDate: d(-29),
    place: 'Lyon',
    type: 'Techno / Rave',
    totalSeats: 350,
    remainingSeats: 0,
    isSecret: false,
    status: 'past',
  },
  {
    id: '5',
    title: 'Acid Spring',
    description: 'Le printemps acide — soirée spéciale 303.',
    startDate: d(-60),
    endDate: d(-59),
    place: 'Lyon',
    type: 'Acid / Techno',
    totalSeats: 200,
    remainingSeats: 0,
    isSecret: false,
    status: 'past',
  },
];
