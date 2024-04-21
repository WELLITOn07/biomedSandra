import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsentComponent } from '../components/consent/consent.component';
import { EbookDetailsModalComponent } from '../components/ebook-details-modal/ebook-details-modal.component';
import { CarouselEbooksComponent } from '../components/carousel-ebooks/carousel-ebooks.component';
import { CarouselEbooksService } from '../services/carouselEbooks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsentComponent, EbookDetailsModalComponent, CarouselEbooksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isCloseCarrouselEbooks: boolean = false;

  constructor(private CarousselEbooksService: CarouselEbooksService) {}
  title = 'biomedSandra';
}
