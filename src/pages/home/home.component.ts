import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  standalone: true,
  imports: [CommonModule, TaigaUiModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  apresentationText: string =
    'Explore o mundo biomédico comigo, Sandra Kotovicz. Descubra e-books que oferecem conhecimentos práticos e experiências reais. Clique abaixo para embarcar nessa jornada.';
}
