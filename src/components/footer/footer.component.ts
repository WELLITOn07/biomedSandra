import { Component } from '@angular/core';
import { TaigaUiModule } from '../../shared/taiga-ui/taiga-ui.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TaigaUiModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  toBrowse(social: string) {
    const socialUrls: Record<string, string> = {
      instagram: 'https://www.instagram.com/biomedsandra/',
      facebook: 'https://www.facebook.com/profile.php?id=100063966036549',
      linkedin: 'https://www.linkedin.com/in/sandra-kotovicz-591a3b218/',
    };

    const url = socialUrls[social.toLowerCase()];

    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Rede social não encontrada:', social);
    }
  }
}
