import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Subject, takeUntil } from 'rxjs';
import { ChangeThemeService } from '../../services/changeTheme.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, TaigaUiModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  isLightTheme: boolean = false;
  isSafari: boolean = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private changeThemeService: ChangeThemeService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.updateTheme();
    this.checkIsSafari();

    this.changeThemeService.isLightTheme$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (isLightTheme: boolean) => {
          this.isLightTheme = isLightTheme;
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }

  private updateTheme(): void {
    this.changeThemeService.ensureDefaultTheme();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private checkIsSafari(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userAgent = navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      if (isSafari) {
        this.isSafari = true;
        this.cdr.detectChanges();
      }
    }
  }
}
