import { TestBed } from '@angular/core/testing';
import { EbookDetailsPageComponent } from './ebook-details-page.component';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';

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
        EbookDetailsPageComponent,
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
    const fixture = TestBed.createComponent(EbookDetailsPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
