import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ChangeThemeService } from '../../services/changeTheme.service';
import { Subject, takeUntil } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkTheme: boolean = false;
  destroySubject = new Subject<void>();

  constructor(
    private changeThemeService: ChangeThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.changeThemeService
      .getTheme()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((theme: boolean) => {
        this.isDarkTheme = theme;
      });
  }

  changeTheme(themeName: string): void {
    this.changeThemeService.changeTheme(themeName);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
