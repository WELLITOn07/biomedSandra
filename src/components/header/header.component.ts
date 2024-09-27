import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  template: `
    <header role="banner" class="fixed-header">
      <div class="header__container">
        <div class="header__actions d-flex justify-content-between align-items-center">
          <div class="header__actions header__actions__ebooks d-flex align-items-center">
            <i class="bi bi-book header__actions__icons header__actions__icons__ebook"></i>

            <app-navbar class="header__actions__navbar"></app-navbar>

            <h1 class="header__actions__title m-0">BiomedSandra</h1>
          </div>

          <div class="header__back-home" *ngIf="!isHomeRoute">
            <a routerLink="/home" class="d-flex align-items-center text-light">
              <i class="bi bi-house-door-fill me-2"></i> Voltar
            </a>
          </div>
        </div>
        <div class="header__divider"></div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  isHomeRoute: boolean = false;

  ngOnInit(): void {
    const currentUrl = this.router.url;

    this.isHomeRoute = currentUrl === '/home';
  }
}
