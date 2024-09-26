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
  showUpdateMessage: boolean = false;

  ngOnInit(): void {
    this.clearAllCache();
  }

  clearAllCache(): void {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        Promise.all(cacheNames.map(cache => caches.delete(cache))).then(() => {
          console.log('Todos os caches foram limpos');
          this.checkForCache();
        });
      }).catch(err => console.error('Erro ao limpar os caches:', err));
    }
  }

  checkForCache(): void {
    const cacheCleared = localStorage.getItem('cacheCleared');

    if (!cacheCleared) {
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          if (cacheNames.length > 0) {
            Promise.all(cacheNames.map(cache => caches.delete(cache))).then(() => {
              this.loading = false;
              localStorage.setItem('cacheCleared', 'true');

              this.showUpdateMessage = true;

              setTimeout(() => {
                this.showUpdateMessage = false;
                window.location.reload();
              }, 5000);
            });
          }
        });
      }
    }
  }
}