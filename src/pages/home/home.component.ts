import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TuiDialogModule, TuiDialogService } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FlexLayoutModule,
    TuiDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isSafari: boolean = false;

  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(TuiDialogService)
    private dialogs: TuiDialogService,
  ) {}

  ngOnInit(): void {
    this.checkIsSafari();
    this.open();
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

  private open(): void {
    this.dialogs.open('Hello!').subscribe();
  }
}
