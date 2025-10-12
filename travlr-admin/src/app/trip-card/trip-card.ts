import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../trip-data.service';

// A presentational component for one trip. State and data loading live in the list.
@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCardComponent {
  // Parent passes a trip. I mark it required with `!` since the parent controls it.
  @Input() trip!: Trip;
}