import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { ChangeThemeService } from '../../services/changeTheme.service'; 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TaigaUiModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private changeThemeService: ChangeThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  changeTheme(themeName: string): void {
    this.changeThemeService.changeTheme(themeName);
    this.cdr.detectChanges();
  }
}
