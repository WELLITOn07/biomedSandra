import {
  Component,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <header role="banner">
      <div class="header__container background-theme">
        <div class="header__actions d-flex justify-content-between align-items-center">
          <div class="header__actions header__actions__ebooks d-flex align-items-center">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-book-open header__actions__icons header__actions__icons__ebook">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>

            <app-navbar class="header__actions__navbar"></app-navbar>

            <h1 class="header__actions__title m-0">E-books / Cursos - BiomedSandra</h1>
          </div>
        </div>
        <div class="header__divider"></div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
