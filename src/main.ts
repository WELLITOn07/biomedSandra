import { CommonModule } from '@angular/common';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environments.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),
  ],
})
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker
        .register('/ngsw-worker.js', {
          scope: './',
          updateViaCache: 'none',
        })
        .then((registration) => {
          console.log('Service Worker registrado com sucesso: ', registration);
        })
        .catch((err) => {
          console.error('Erro ao registrar o Service Worker: ', err);
        });
    }
  })
  .catch((err) => console.error(err));
