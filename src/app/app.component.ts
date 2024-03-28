import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentComponent } from '../components/consent/consent.component';
import { EbookDetailsModalComponent } from '../components/ebook-details-modal/ebook-details-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentComponent, EbookDetailsModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'biomedSandra';
}
