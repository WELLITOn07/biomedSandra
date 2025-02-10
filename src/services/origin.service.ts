import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export enum OriginType {
  EMAIL = 'EMAIL',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  OUTROS = 'OUTROS',
}

@Injectable({
  providedIn: 'root',
})
export class OriginService {
  constructor(private route: ActivatedRoute) {}

  getOriginFromUrl(): OriginType {
    const origin = this.route.snapshot.queryParamMap.get('origin');
    switch (origin?.toLowerCase()) {
      case 'email':
        return OriginType.EMAIL;
      case 'instagram':
        return OriginType.INSTAGRAM;
      case 'linkedin':
        return OriginType.LINKEDIN;
      default:
        return OriginType.OUTROS;
    }
  }
}
