import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { EbookPurchaseRedirectService } from '../services/ebookPurchaseRedirect.service';

export const ebookSelectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ebookPurchaseRedirectService = inject(EbookPurchaseRedirectService);

  if (ebookPurchaseRedirectService.hasEbookSelected()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
