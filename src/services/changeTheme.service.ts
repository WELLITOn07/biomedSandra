import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService {
  private readonly themeKey = 'user-theme';
  private defaultTheme = 'dark-theme';
  private isLightTheme = new BehaviorSubject<boolean>(false);
  public isLightTheme$ = this.isLightTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setTheme(themeName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.themeKey, themeName);
      this.sharedTheme();
    }
  }

  ensureDefaultTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentTheme = localStorage.getItem(this.themeKey);
      if (!currentTheme) {
        this.setTheme(this.defaultTheme);
        this.sharedTheme();
      } else {
        this.sharedTheme();
      }
    }
  }

  sharedTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem(this.themeKey);
      const isLightTheme = Boolean(theme === 'light-theme')
      return this.isLightTheme.next(isLightTheme);
    }
    return this.isLightTheme.next(false);
  }
}
