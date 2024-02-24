import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  constructor() { }

  goTo(social: string) {
    const socialUrls: Record<string, string> = {
      instagram: 'https://www.instagram.com/biomedsandra/',
      facebook: 'https://www.facebook.com/profile.php?id=100063966036549',
      linkedin: 'https://www.linkedin.com/in/sandra-kotovicz-591a3b218/',
      github: 'https://github.com/WELLITOn07'
    };

    const url = socialUrls[social.toLowerCase()];

    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Rede social não encontrada:', social);
    }
  }

}
