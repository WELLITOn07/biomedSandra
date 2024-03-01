import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService {
  private readonly themeKey = 'user-theme';
  public isDarkTheme = new BehaviorSubject<boolean>(false);

  public changeTheme(themeName: string): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(themeName);
    const isDarkTheme = Boolean(themeName === 'dark-theme');
    this.isDarkTheme.next(isDarkTheme);
    localStorage.setItem(this.themeKey, themeName);
  }

  public getTheme(): Observable<boolean> {
    const storedTheme = localStorage.getItem(this.themeKey);
    const isDarkTheme = Boolean(storedTheme === 'dark-theme');
    this.isDarkTheme.next(isDarkTheme);
    return this.isDarkTheme.asObservable();
  }
}
