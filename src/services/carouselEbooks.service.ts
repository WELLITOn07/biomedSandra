import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselEbooksService {
  constructor() {}
  private openModalSubject = new BehaviorSubject<boolean>(false);

  openModal() {
    this.openModalSubject.next(true);
  }

  closeModal() {
    this.openModalSubject.next(false);
  }

  getModalStatus() {
    return this.openModalSubject.asObservable();
  }
}
