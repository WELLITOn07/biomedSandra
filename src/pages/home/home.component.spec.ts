import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieConsentService } from '../../services/cookieConsent.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCookieConsentService: Partial<CookieConsentService>;

  beforeEach(async () => {
    mockCookieConsentService = {
      getConsentStatus: jest.fn().mockReturnValue(of(true)),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [
        { provide: CookieConsentService, useValue: mockCookieConsentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
