import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripDataService, Trip } from '../trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card';

// This component owns the list page: it fetches data and renders cards.
// I intentionally keep loading/error state here, not in the card.
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './trips.html'
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(private svc: TripDataService) {}

  ngOnInit(): void {
    // Fetch the list once on load; a real app would add pagination or filters here.
    this.svc.getTrips().subscribe({
      next: data => { this.trips = data; this.loading = false; },
      error: err => {
        this.error = 'Failed to load trips';
        this.loading = false;
        console.error('Trips load error:', err);
      }
    });
  }
}