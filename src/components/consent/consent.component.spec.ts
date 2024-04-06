import { TestBed } from '@angular/core/testing';
import { ConsentComponent } from './consent.component';
import { CookieConsentService } from '../../services/cookieConsent.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

class MockCookieConsentService {
  consentStatus$ = of(true); 
  giveConsent = jest.fn();
  getConsentStatus = () => this.consentStatus$;
}

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: any;
  let mockCookieConsentService: MockCookieConsentService;

  beforeEach(async () => {
    mockCookieConsentService = new MockCookieConsentService();

    await TestBed.configureTestingModule({
      imports: [CommonModule, ConsentComponent],
      providers: [
        { provide: CookieConsentService, useValue: mockCookieConsentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show consent modal if consent is acquired', () => {
    mockCookieConsentService.consentStatus$ = of(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.consentAcquired).toBe(true);
  });

  it('should call giveConsent on cookieConsent service when giveConsent is called', () => {
    component.giveConsent();
    expect(mockCookieConsentService.giveConsent).toHaveBeenCalled();
  });
});
