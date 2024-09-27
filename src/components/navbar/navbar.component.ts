import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EbookDataService } from '../../services/ebookData.service';
import { Ebook } from '../../models/ebook.model';

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
    private cdr: ChangeDetectorRef
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
    const urlMap: Record<string, string> = {
      instagram: 'https://www.instagram.com',
      linkedin: 'https://www.linkedin.com',
      facebook: 'https://www.facebook.com',
      github: 'https://github.com',
    };
    const url = urlMap[social];
    if (url) {
      window.open(url, '_blank');
    }
  }

  openEbook(id: string): void {
    if (id) {
      // Simulate clicking the close button before navigating
      const closeButton = document.querySelector('.btn-close') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }

      // Wait for the offcanvas to close and then navigate
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/ebook-details', id]);
        });
      }, 300); // Adjust delay based on animation duration
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
