import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { ChangeThemeService } from '../../services/changeTheme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TaigaUiModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLightTheme: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private changeThemeService: ChangeThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.changeThemeService.isLightTheme$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (isLightTheme: boolean) => {
        this.isLightTheme = isLightTheme;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });

    this.updateTheme();
  }

  private updateTheme(): void {
    this.changeThemeService.ensureDefaultTheme();
    this.cdr.detectChanges();
  }

  changeTheme(themeName: string): void {
    this.changeThemeService.setTheme(themeName);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
