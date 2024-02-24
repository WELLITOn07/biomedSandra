import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Subject, takeUntil } from 'rxjs';
import { ChangeThemeService } from '../../services/changeTheme.service';

@Component({
  standalone: true,
  imports: [CommonModule, TaigaUiModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  isLightTheme: boolean = false;
  private unsubscribe: Subject<void> = new Subject<void>();

  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private changeThemeService: ChangeThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateTheme();
    
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
}
