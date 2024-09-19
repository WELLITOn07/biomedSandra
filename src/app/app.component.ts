import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentComponent } from '../components/consent/consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  constructor() {}
  title = 'biomedSandra';
}
