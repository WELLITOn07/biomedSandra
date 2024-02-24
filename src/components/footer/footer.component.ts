import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { RedirectionService } from '../../services/redirection.service';
import { ChangeThemeService } from '../../services/changeTheme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TaigaUiModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  isLightTheme: boolean = false;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private redirectionService: RedirectionService,
    private changeThemeService: ChangeThemeService
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
  }

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
