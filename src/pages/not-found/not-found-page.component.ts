import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-ebook-not-found',
  template: `
    <div class="modal show d-block" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Ebook não encontrado</h5>
          </div>
          <div class="modal-body">
            Não foi possível localizar o ebook solicitado. Você será redirecionado para a página inicial em 5 segundos.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="redirectToHome()">Ir para a página inicial agora</button>
          </div>
        </div>
      </div>
    </div>
  `
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
