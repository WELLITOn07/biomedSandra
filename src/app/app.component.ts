import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  ngOnInit(): void {
    this.checkForCache();
  }

  checkForCache(): void {
    const cacheCleared = localStorage.getItem('cacheCleared');

    if (!cacheCleared) {
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          if (cacheNames.length > 0) {
            this.clearAllCache();
          }
        });
      }
    }
  }

  clearAllCache(): void {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        Promise.all(cacheNames.map(cache => caches.delete(cache))).then(() => {
          localStorage.setItem('cacheCleared', 'true');
        }).catch(err => console.error('Erro ao limpar os caches:', err));
      });
    }
  }
}
