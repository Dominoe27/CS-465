import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips';

// I’m lazy-loading the form to avoid tight coupling on the export name.
export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent },
  { path: 'add', loadComponent: () => import('./trip-form/trip-form').then(m => m.TripFormComponent) },
  { path: 'edit/:id', loadComponent: () => import('./trip-form/trip-form').then(m => m.TripFormComponent) },
  { path: '**', redirectTo: 'trips' }
];