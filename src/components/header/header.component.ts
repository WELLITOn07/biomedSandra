import { Component } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TaigaUiModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
