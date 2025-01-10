import { Component } from '@angular/core';

@Component({
  selector: 'app-support-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-white text-center p-4">
      <p>Se precisar de suporte ou tiver alguma dúvida, entre em contato pelo email <a href="mailto:biomed&#64;sandracontato.com" class="text-white">biomedsandracontato&#64;gmail.com</a></p>
    </footer>
  `,
  styles: [
    `
      footer {
        position: relative;
        bottom: 0;
        width: 100%;
      }
    `
  ]
})
export class SupportFooterComponent {}
