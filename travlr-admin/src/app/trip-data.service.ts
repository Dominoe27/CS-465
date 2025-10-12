import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// I’m aligning the front-end model to my backend schema (see Trip model).
export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;      // days
  start: Date;         // first available start date
  resort: string;
  price: number;       // total price
  perPerson: boolean;  // true = price is per person
  image: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TripDataService {
  // During development I prefer the proxy (/api). If the proxy isn’t active,
  // I can temporarily swap this to 'http://localhost:3000/api/trips' to isolate issues.
  private apiBase = '/api/trips';

  constructor(private http: HttpClient) {}

  // Read all trips for card listing
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBase);
  }

  // Read a single trip for edit screen
  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/${id}`);
  }

  // Create a new trip (Add form)
  addTrip(t: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBase, t);
  }

  // Update an existing trip (Edit form)
  updateTrip(id: string, t: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBase}/${id}`, t);
  }

  // Remove a trip (optional from Edit screen)
  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${id}`);
  }
}