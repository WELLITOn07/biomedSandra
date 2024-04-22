import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestimonysComponent } from './testimonys.component';
import { TestimonyService } from '../../services/testimony.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const mockTestimonies = [
  { id: 1, author: 'Matheus Augusto', rating: 5, text: 'Sample text 1' },
  { id: 2, author: 'Mari Wojcik', rating: 5, text: 'Sample text 2' },
];

class MockTestimonyService {
  getAll() {
    return of(mockTestimonies);
  }
}

describe('TestimonysComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, TestimonysComponent],
      providers: [
        {
          provide: TestimonyService,
          useClass: MockTestimonyService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TestimonysComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load testimonies on init', () => {
    const fixture = TestBed.createComponent(TestimonysComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.testimonies).toEqual(mockTestimonies);
  });

  it('should handle ratings correctly', () => {
    const fixture = TestBed.createComponent(TestimonysComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const starsCount = component.arrayOf(mockTestimonies[0].rating).length;
    expect(starsCount).toEqual(5);
  });
});
