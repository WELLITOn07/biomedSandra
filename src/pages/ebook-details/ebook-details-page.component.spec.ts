import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { EbookDetailsPageComponent } from './ebook-details-page.component';
import { EbookPurchaseRedirectService } from '../../services/ebookPurchaseRedirect.service';
import { RedirectionService } from '../../services/redirection.service';
import { Ebook } from '../../models/ebook.model';
import { AppOfferTimerComponent } from '../../components/app-offer-timer/offer-timer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestimonysComponent } from '../../components/testimonys/testimonys.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';

describe('EbookDetailsPageComponent', () => {
  let component: EbookDetailsPageComponent;
  let fixture: ComponentFixture<EbookDetailsPageComponent>;
  let ebookPurchaseRedirectServiceMock: any;
  let redirectionServiceMock: any;
  let routerMock: any;

  const mockEbook: Ebook = {
    id: '1',
    title: 'Ebook 1',
    description: 'Description 1',
    cover: 'cover1',
    link: 'https://example.com/ebook-1',
    type: 'ebook',
    installmentsCount: 3,
    installmentsValue: '10.00',
    price: {
      original: '$20',
      discounted: '$15',
    },
    subjects: [
      {
        id: 1,
        category: 'Category 1',
        topics: ['Topic 1', 'Topic 2'],
      },
    ],
    works: [
      {
        id: 1,
        title: 'Work 1',
        url: 'https://example.com/work1',
      },
    ],
  };

  beforeEach(async () => {
    ebookPurchaseRedirectServiceMock = {
      ebookSelected$: of(mockEbook),
    };

    redirectionServiceMock = {
      goToExternal: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        AppOfferTimerComponent,
        NavbarComponent,
        TestimonysComponent,
        HeaderComponent,
        EbookDetailsPageComponent,
      ],
      providers: [
        provideLottieOptions({
          player: () => import('lottie-web'),
        }),
        { provide: EbookPurchaseRedirectService, useValue: ebookPurchaseRedirectServiceMock },
        { provide: RedirectionService, useValue: redirectionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EbookDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the ebook property on initialization', () => {
    expect(component.ebook).toEqual(mockEbook);
  });

  it('should call goToExternal with the correct URL when toBrowseExternal is invoked', () => {
    const url = 'https://example.com';
    component.toBrowseExternal(url);
    expect(redirectionServiceMock.goToExternal).toHaveBeenCalledWith(url);
  });

  it('should not call goToExternal if URL is undefined', () => {
    component.toBrowseExternal(undefined);
    expect(redirectionServiceMock.goToExternal).not.toHaveBeenCalled();
  });

  it('should unsubscribe from ebookSelected$ on component destruction', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
