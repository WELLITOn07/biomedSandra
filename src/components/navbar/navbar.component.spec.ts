import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { EbookDataServiceService } from '../../services/ebookData.service';
import { RedirectionService } from '../../services/redirection.service';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

// Mock classes para os serviços
class MockEbookDataService {
  getAll(): Observable<any[]> {
    return of([{ id: '1', title: 'Test Ebook' }]);
  }
}

class MockRedirectionService {
  goTo = jest.fn();
}

class MockEbookPurchaseRedirectService {
  selectEbook = jest.fn();
}

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NavbarComponent],
      providers: [
        { provide: EbookDataServiceService, useClass: MockEbookDataService },
        { provide: RedirectionService, useClass: MockRedirectionService },
        {
          provide: EbookPurchaseRedirectService,
          useClass: MockEbookPurchaseRedirectService,
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have ebookData populated after initialization', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.ebookData).toEqual([{ id: '1', title: 'Test Ebook' }]);
  });

  it('calls goTo when toBrowse is called with a social media name', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    const redirectionService = TestBed.inject(RedirectionService);
    component.toBrowse('facebook');
    expect(redirectionService.goTo).toHaveBeenCalledWith('facebook');
  });

  it('calls selectEbook when openEbook is called with an ebook id', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    const ebookPurchaseRedirectService = TestBed.inject(
      EbookPurchaseRedirectService
    );
    component.openEbook('1');
    expect(ebookPurchaseRedirectService.selectEbook).toHaveBeenCalledWith('1');
  });
});
