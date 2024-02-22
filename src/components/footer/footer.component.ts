import { Component } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TaigaUiModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
