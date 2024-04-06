import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppOfferTimerComponent } from './offer-timer.component';
import { HttpClientModule } from '@angular/common/http'; 

describe('AppOfferTimerComponent', () => {
  let component: AppOfferTimerComponent;
  let fixture: ComponentFixture<AppOfferTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppOfferTimerComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(AppOfferTimerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize time until offer ends on ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'updateTimeUntilOfferEnds');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.intervalId).not.toBe(0);
    spy.mockRestore();
  });
});
