import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselEbooksComponent } from './carousel-ebooks.component';
import { EbookDataServiceService } from '../../services/ebookData.service';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { of } from 'rxjs';
import { Renderer2 } from '@angular/core';

class MockEbookDataService {
  getAll() {
    return of([
      {
        id: '1',
        title: 'Ebook Test 1',
        cover: 'cover1',
        description: 'Description 1',
      },
      {
        id: '2',
        title: 'Ebook Test 2',
        cover: 'cover2',
        description: 'Description 2',
      },
    ]);
  }
}

class MockCarouselEbooksService {
  closeModal() {}
  openModal() {}
}

class MockEbookPurchaseRedirectService {
  selectEbook(id: string) {}
}

describe('CarouselEbooksComponent', () => {
  let component: CarouselEbooksComponent;
  let fixture: ComponentFixture<CarouselEbooksComponent>;
  let mockEbookDataService: MockEbookDataService;
  let mockCarouselEbooksService: MockCarouselEbooksService;
  let mockEbookPurchaseRedirectService: MockEbookPurchaseRedirectService;
  let renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselEbooksComponent],
      providers: [
        { provide: EbookDataServiceService, useClass: MockEbookDataService },
        { provide: CarouselEbooksService, useClass: MockCarouselEbooksService },
        {
          provide: EbookPurchaseRedirectService,
          useClass: MockEbookPurchaseRedirectService,
        },
        Renderer2,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselEbooksComponent);
    component = fixture.componentInstance;
    mockEbookDataService = TestBed.inject(
      EbookDataServiceService
    ) as unknown as MockEbookDataService;
    mockCarouselEbooksService = TestBed.inject(
      CarouselEbooksService
    ) as unknown as MockCarouselEbooksService;
    mockEbookPurchaseRedirectService = TestBed.inject(
      EbookPurchaseRedirectService
    ) as unknown as MockEbookPurchaseRedirectService;
    renderer = TestBed.inject(Renderer2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
