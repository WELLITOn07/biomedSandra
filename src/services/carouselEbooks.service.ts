import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselEbooksService {
  constructor() {}
  private closeModalSubject = new BehaviorSubject<boolean>(true);

  openModal() {
    this.closeModalSubject.next(false);
  }

  closeModal() {
    this.closeModalSubject.next(true);
  }

  getModalStatus() {
    return this.closeModalSubject.asObservable();
  }
}
