import { Component } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { RedirectionService } from '../../services/redirection.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TaigaUiModule, FlexLayoutModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isLightTheme: boolean = false;
  constructor(private redirectionService: RedirectionService) {}

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }
}
