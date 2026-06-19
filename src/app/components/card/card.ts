import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  title = input.required<string>();
  description = input.required<string>();

  link = input<string | null>(null);
  linkText = input<string>('Bekijk →');
}
