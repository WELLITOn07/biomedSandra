import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home-page.component';
import { EbookDetailsPageComponent } from '../pages/ebook-details/ebook-details-page.component';
import { ebookSelectedGuard } from '../guards/ebook-selected.guard';
import { NotFoundPageComponent } from '../pages/not-found/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'ebook-details',
    component: EbookDetailsPageComponent,
    canActivate: [ebookSelectedGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
