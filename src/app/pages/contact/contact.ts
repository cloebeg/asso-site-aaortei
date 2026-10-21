import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export default class ContactComponent {
  private readonly endpoint = 'https://formspree.io/f/xwlvgayl';

  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.status() === 'sending') return;

    const form = event.target as HTMLFormElement;
    this.status.set('sending');

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        this.status.set('success');
      } else {
        this.status.set('error');
      }
    } catch {
      this.status.set('error');
    }
  }
}
