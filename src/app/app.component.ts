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
            this.promptUserToClearCache();
          }
        });
      }
    }
  }

  promptUserToClearCache(): void {
    const userResponded = new Promise<void>((resolve) => {
      const userAction = window.confirm("Há uma atualização disponível. Clique em 'OK' para atualizar a página.");
      resolve(userAction ? this.clearAllCache() : undefined);
    });

    setTimeout(() => {
      userResponded.then(() => {
        window.location.reload();
      });
    }, 5000);
  }

  clearAllCache(): void {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        Promise.all(cacheNames.map(cache => caches.delete(cache))).then(() => {
          console.log('Todos os caches foram limpos');
          localStorage.setItem('cacheCleared', 'true');
          window.location.reload();
        }).catch(err => console.error('Erro ao limpar os caches:', err));
      });
    }
  }
}
