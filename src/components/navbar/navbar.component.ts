import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RedirectionService } from './../../services/redirection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EbookDataServiceService } from '../../services/ebookData.service';
import { Ebook } from '../../models/ebook.model';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['../../styles/_custombootstrap.scss', './navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  ebookData$: Observable<Ebook[]> = this.ebookDataServiceService.getAll();
  ebookData: Ebook[] | null = null;
  destroySubject: Subject<void> = new Subject<void>();

  constructor(
    private redirectionService: RedirectionService,
    private ebookDataServiceService: EbookDataServiceService,
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ebookData$.pipe(takeUntil(this.destroySubject)).subscribe({
      next: (ebookData: Ebook[]) => {
        if (ebookData) {
          this.ebookData = [...ebookData];
          this.cdr.detectChanges();
        }
      },
      error: () => {
        console.error('Erro ao buscar ebooks');
      },
    });
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  openEbook(idEbook: string | null) {
    if (!idEbook) {
      return;
    }

    this.ebookPurchaseRedirectService.selectEbook(idEbook);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
