import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Testimony } from '../../models/testimony.model';
import { TestimonyService } from '../../services/testimony.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TestimonyData } from '../../models/testimony.model';

@Component({
  selector: 'app-testimonys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonys.component.html',
  styleUrl: './testimonys.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonysComponent implements OnInit, OnDestroy {
  @Input({ required: true }) subject: keyof TestimonyData | null = null;

  testimonies: Testimony[] = [];
  testimonies$!: Observable<Testimony[]>;
  destroySubject: Subject<void> = new Subject<any>();

  constructor(
    private testimonyService: TestimonyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.subject) {
      console.error('Subject is required and cannot be null.');
      return;
    }

    this.testimonies$ = this.testimonyService.getBySubject(this.subject);
    this.testimonies$
      .pipe(takeUntil(this.destroySubject))
      .subscribe({
        next: (testimonies) => {
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
