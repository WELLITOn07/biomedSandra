import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EbookDataService } from '../../services/ebookData.service';
import { Ebook } from '../../models/ebook.model';
import { RedirectionService } from '../../services/redirection.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  ebookData$: Observable<Ebook[]> = this.ebookDataService.getAll();
  ebookData: Ebook[] | null = null;
  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private ebookDataService: EbookDataService,
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService
  ) {}

  ngOnInit(): void {
    this.ebookData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: Ebook[]) => {
        if (data) {
          this.ebookData = [...data];
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.error('Erro ao carregar dados dos ebooks.');
      },
    });
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openEbook(id: string): void {
    if (id) {
      const closeButton = document.querySelector('.btn-close') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }

      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/ebook-details', id]);
        });
      }, 300);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
