import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Ebook } from '../../models/ebook.model';
import { EbookDataServiceService } from '../../services/ebookData.service';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';

@Component({
  selector: 'app-carousel-ebooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-ebooks.component.html',
  styleUrls: ['../../styles/_custombootstrap.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselEbooksComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('carouselEbooksInner') modalElementRef!: ElementRef;

  destroySubject: Subject<void> = new Subject<void>();
  currentEbookIndex: number = 0;
  ebookData$: Observable<Ebook[]> = this.ebookDataService.getAll();
  ebookData!: Ebook[];

  constructor(
    private cdr: ChangeDetectorRef,
    private ebookDataService: EbookDataServiceService,
    private carouselEbooksService: CarouselEbooksService,
    private ebookPurchaseRedirectService: EbookPurchaseRedirectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.ebookData$.pipe(takeUntil(this.destroySubject)).subscribe({
      next: (ebookData: Ebook[]) => {
        this.ebookData = [...ebookData];
        this.cdr.detectChanges();
      },
      error: () => console.error('Erro ao buscar ebooks'),
    });
  }

  ngAfterViewInit(): void {
    if (this.modalElementRef && this.modalElementRef.nativeElement) {
      this.renderer.listen(
        this.modalElementRef.nativeElement,
        'hidden.bs.modal',
        () => {
          this.carouselEbooksService.closeModal();
        }
      );

      this.renderer.listen(
        this.modalElementRef.nativeElement,
        'shown.bs.modal',
        () => {
          this.carouselEbooksService.openModal();
        }
      );

      this.renderer.listen(
        this.modalElementRef.nativeElement.querySelector('#carouselEbooks'),
        'slide.bs.carousel',
        (event: any) => {
          this.updateCurrentEbookIndexOnSlide(event.to);
        }
      );
    }
  }

  updateCurrentEbookIndexOnSlide(newIndex: number): void {
    this.currentEbookIndex = newIndex;
    this.cdr.detectChanges();
  }

  openEbook(idEbook: string | null): void {
    if (!idEbook) {
      return;
    }

    const modalElement: HTMLElement = this.modalElementRef.nativeElement;
    const closeButton: HTMLElement | null =
      modalElement.querySelector('.btn-close');
    if (closeButton) {
      closeButton.click();
    }

    this.ebookPurchaseRedirectService.selectEbook(idEbook);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
