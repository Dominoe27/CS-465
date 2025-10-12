import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TripDataService, Trip } from '../trip-data.service';

// This component is shared by Add and Edit. It initializes differently
// based on the presence of :id in the route.
@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './trip-form.html',
  styleUrls: ['./trip-form.css']
})
export class TripFormComponent implements OnInit {
  isEdit = false;
  id: string | null = null;

  loading = true;
  error = '';
  saving = false;

  // I’ll initialize the form in the constructor (FormBuilder is ready there).
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: TripDataService
  ) {
    // These validators reflect the backend schema (required and numeric checks).
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      length: [1, [Validators.required, Validators.min(1)]],
      start: ['', [Validators.required]],
      resort: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      perPerson: [true, [Validators.required]],
      image: [''],
      description: ['', [Validators.maxLength(5000)]]
    });
  }

  ngOnInit(): void {
    // If there’s an id in the URL, I’m editing; otherwise I’m adding.
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    if (!this.isEdit) {
      this.loading = false;
      return;
    }

    // For edit, populate the form with existing values.
    this.svc.getTrip(this.id!).subscribe({
      next: (t) => {
        const start = t.start ? new Date(t.start).toISOString().slice(0, 10) : '';
        this.form.patchValue({
          code: t.code, name: t.name, length: t.length, start,
          resort: t.resort, price: t.price, perPerson: t.perPerson,
          image: t.image, description: t.description
        });
        this.loading = false;
      },
      error: (e) => {
        this.error = 'Failed to load trip.';
        this.loading = false;
        console.error('Trip load error:', e);
      }
    });
  }

  // Unified submit covers both Add (POST) and Edit (PUT).
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;

    const v = this.form.value;
    const payload: Trip = {
      code: v.code!, name: v.name!,
      length: Number(v.length),
      start: new Date(v.start!),
      resort: v.resort!,
      price: Number(v.price),          // should log a number (not NaN)
      perPerson: !!v.perPerson,
      image: v.image || '',
      description: v.description || ''
    };

      console.log('PUT payload', { id: this.id, payload });

    const obs = this.isEdit
      ? this.svc.updateTrip(this.id!, payload)
      : this.svc.addTrip(payload);

    obs.subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (e) => {
        // I want to see the backend’s message instead of a generic string.
        const serverMsg =
          (e?.error && (e.error.message || e.error.error)) ||
          e?.message ||
          'Save failed.';
        this.error = serverMsg;
        this.saving = false;
        console.error('Trip save error:', e);
      }

    });
  }


  delete(): void {
    if (!this.isEdit || !this.id) return;
    if (!confirm('Delete this trip?')) return;

    this.svc.deleteTrip(this.id).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (e) => {
        this.error = 'Delete failed.';
        console.error('Trip delete error:', e);
      }
    });
  }
}