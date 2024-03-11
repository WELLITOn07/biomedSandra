import { Component } from '@angular/core';
import { RedirectionService } from '../../services/redirection.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FlexLayoutModule],
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
