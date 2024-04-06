import { TestBed } from '@angular/core/testing';
import { EbookDetailsModalComponent } from './ebook-details-modal.component';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppOfferTimerComponent } from '../app-offer-timer/offer-timer.component';

const mockEbook = {
  id: '1',
  title: 'Test Ebook',
  subjects: [{ category: 'Test Category', topics: ['Topic 1', 'Topic 2'] }],
  works: [{ title: 'Work 1', url: 'http://example.com' }],
};

class MockEbookPurchaseRedirectService {
  ebookSelected$ = of(mockEbook);
}

describe('EbookDetailsModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        EbookDetailsModalComponent,
        NavbarComponent,
        AppOfferTimerComponent,
      ],
      providers: [
        {
          provide: EbookPurchaseRedirectService,
          useClass: MockEbookPurchaseRedirectService,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EbookDetailsModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show modal with ebook details on init', () => {
    const fixture = TestBed.createComponent(EbookDetailsModalComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.showModal).toBe(true);
    expect(component.ebook).toEqual(mockEbook);
  });

  it('should hide modal when closeModal is called', () => {
    const fixture = TestBed.createComponent(EbookDetailsModalComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.closeModal();
    expect(component.showModal).toBe(false);
  });
});
