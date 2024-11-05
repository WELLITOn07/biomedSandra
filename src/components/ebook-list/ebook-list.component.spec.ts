import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { EbookDataService } from '../../services/ebookData.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { EbookListComponent } from './book-list.component';
import { Ebook } from '../../models/ebook.model';

describe('EbookListComponent', () => {
  let component: EbookListComponent;
  let fixture: ComponentFixture<EbookListComponent>;
  let ebookDataServiceMock: any;

  const mockEbooks: Ebook[] = [
    {
      id: '1',
      title: 'Ebook 1',
      description: 'Description 1',
      cover: 'cover1',
      link: '/ebook-1',
      type: 'ebook',
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
    },
    {
      id: '2',
      title: 'Video Course 1',
      description: 'Description 2',
      cover: 'cover2',
      link: '/video-course-1',
      type: 'video',
      price: {
        original: '$50',
        discounted: '$40',
      },
      subjects: [
        {
          id: 2,
          category: 'Category 2',
          topics: ['Topic A', 'Topic B'],
        },
      ],
      works: [
        {
          id: 2,
          title: 'Supplementary Material 1',
          url: 'https://example.com/material1',
        },
      ],
    },
  ];

  beforeEach(async () => {
    ebookDataServiceMock = {
      getAll: jest.fn().mockReturnValue(of(mockEbooks)),
    };

    await TestBed.configureTestingModule({
      imports: [EbookListComponent, RouterTestingModule],
      providers: [{ provide: EbookDataService, useValue: ebookDataServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EbookListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load eBooks and update the list', () => {
    fixture.detectChanges();
    expect(component.ebooks.length).toBe(2);
    expect(component.isLoading).toBe(false);
  });

  it('should display the list of eBooks after loading', () => {
    component.isLoading = false;
    component.ebooks = mockEbooks;
    fixture.detectChanges();
    const ebookElements = fixture.debugElement.queryAll(By.css('.card'));
    expect(ebookElements.length).toBe(2);
  });

  it('should display an error message when failing to load eBooks', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    ebookDataServiceMock.getAll.mockReturnValueOnce(throwError(() => new Error('Load error')));
    fixture.detectChanges();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar os eBooks:', expect.any(Error));
    expect(component.isLoading).toBe(false);
  });
});
