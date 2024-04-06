import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ChangeThemeService } from '../../services/changeTheme.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockChangeThemeService: Partial<ChangeThemeService>;

  beforeEach(async () => {
    mockChangeThemeService = {
      getTheme: jest.fn().mockReturnValue(of(true)),
      changeTheme: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
      providers: [
        { provide: ChangeThemeService, useValue: mockChangeThemeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDarkTheme based on theme from ChangeThemeService', () => {
    expect(component.isDarkTheme).toBe(true);
  });

  it('should call changeTheme on ChangeThemeService when changeTheme is called', () => {
    const themeName = 'dark-theme';
    component.changeTheme(themeName);
    expect(mockChangeThemeService.changeTheme).toHaveBeenCalledWith(themeName);
  });
});
