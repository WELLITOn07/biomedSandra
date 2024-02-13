import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TuiRootModule } from '@taiga-ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      TuiRootModule,
    ),
  ],
}).catch(err => console.error(err));

