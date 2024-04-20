import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Testimony } from '../../models/testimony.model';
import { TestimonyService } from '../../services/testimony.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonys.component.html',
  styleUrl: './testimonys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonysComponent implements OnInit, OnDestroy {
  testimonies: Testimony[] = [];
  testimonies$: Observable<Testimony[]> = this.testimonyService.getAll();
  destroySubject: Subject<void> = new Subject<any>();

  constructor(
    private testimonyService: TestimonyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.testimonies$.pipe(takeUntil(this.destroySubject)).subscribe({
      next: (testimonies) => {
        console.log('Received testimonies:', testimonies);
        if (Array.isArray(testimonies)) {
          this.testimonies = testimonies;
        } else {
          console.error('Expected an array, but received:', testimonies);
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching testimonies:', err),
    });
  }

  arrayOf(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  trackByFn(__: number, item: Testimony) {
    return item.id;
  }
}
