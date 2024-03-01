import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService {
  private readonly themeKey = 'user-theme';
  public isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public changeTheme(themeName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(themeName);
      const isDarkTheme = Boolean(themeName === 'dark-theme');
      localStorage.setItem(this.themeKey, themeName);

      this.isDarkTheme.next(isDarkTheme);
    }
  }

  public getTheme(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem(this.themeKey);
      const isDarkTheme = Boolean(storedTheme === 'dark-theme');
      this.isDarkTheme.next(isDarkTheme);
    }
    return this.isDarkTheme.asObservable();
  }
}
