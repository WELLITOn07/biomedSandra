import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ebook-not-found',
  template: `
    <div class="full-screen-bg d-flex flex-column justify-content-center align-items-center text-center text-light">
      <div class="status-header">
        <h1 class="status-number">404</h1>
      </div>

      <div class="card card-dark">
        <div class="card-body">
          <h5 class="card-title">Ebook não encontrado</h5>
          <p class="card-text">
            Não foi possível localizar o ebook solicitado. Você será redirecionado para a página inicial em 5 segundos.
          </p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary w-100" (click)="redirectToHome()">Ir para a página inicial agora</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .full-screen-bg {
      background-color: #2c2c2c;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .status-header {
      margin-bottom: 40px;
    }

    .status-number {
      font-size: 8rem; 
      font-weight: bold;
      color: #ffffff;
    }

    .card-dark {
      background-color: #3c3c3c;
      color: #ffffff;
      width: 100%;
      max-width: 400px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .card-footer {
      border-top: none;
    }

    .card-title {
      font-size: 1.25rem;
      margin-bottom: 10px;
    }

    .card-text {
      font-size: 1rem;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .status-number {
        font-size: 6rem; /* Tamanho menor do status em telas pequenas */
      }

      .card-title {
        font-size: 1.1rem;
      }

      .card-text {
        font-size: 0.9rem;
      }

      .btn {
        font-size: 0.9rem;
      }
    }
  `]
})
export class EbookNotFoundPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    timer(5000).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}