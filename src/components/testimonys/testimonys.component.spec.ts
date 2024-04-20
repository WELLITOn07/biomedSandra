import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonysComponent } from './testimonys.component';

describe('TestimonysComponent', () => {
  let component: TestimonysComponent;
  let fixture: ComponentFixture<TestimonysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
