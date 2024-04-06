import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieConsentService } from '../../services/cookieConsent.service';
import { CarouselEbooksService } from '../../services/carouselEbooks.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCookieConsentService: Partial<CookieConsentService>;
  let mockCarouselEbooksService: Partial<CarouselEbooksService>;

  beforeEach(async () => {
    mockCookieConsentService = {
      getConsentStatus: jest.fn().mockReturnValue(of(true)),
    };
    mockCarouselEbooksService = {
      getModalStatus: jest.fn().mockReturnValue(of(true)),
      openModal: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [
        { provide: CookieConsentService, useValue: mockCookieConsentService },
        { provide: CarouselEbooksService, useValue: mockCarouselEbooksService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call openCarouselEbooks and change modal status when button is clicked', () => {
    jest.spyOn(component, 'openCarouselEbooks');
    component.openCarouselEbooks();
    expect(component.openCarouselEbooks).toHaveBeenCalled();
    expect(mockCarouselEbooksService.openModal).toHaveBeenCalled();
  });
});
