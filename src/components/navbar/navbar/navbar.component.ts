import { RedirectionService } from './../../../services/redirection.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor (private redirectionService: RedirectionService) {}

  toBrowse(social: string) {
    this.redirectionService.goTo(social);
  }
}
