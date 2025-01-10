import { Component } from '@angular/core';

@Component({
  selector: 'app-support-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-center text-lg-start p-4">
      <p class="text-lg-start">Se precisar de suporte ou tiver alguma dúvida, entre em contato pelo email <a href="mailto:biomed&#64;sandracontato.com" class="text-white">biomedsandracontato&#64;gmail.com</a></p>
    </footer>
  `,
  styles: [
    `
      footer {
        position: relative;
        bottom: 0;
        width: 100%;
      }

      @media (max-width: 576px) {
        p {
          font-size: 1rem;
        }
      }
    `
  ]
})
export class SupportFooterComponent {}
