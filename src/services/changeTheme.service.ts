import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService {
  private readonly themeKey = 'theme';

  changeTheme(themeName: string): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(themeName);
    localStorage.setItem(this.themeKey, themeName);
  }
}
