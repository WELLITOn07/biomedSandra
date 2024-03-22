import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselEbooksService {
  constructor() {}
  private openModalSubject = new Subject<boolean>();

  openModal() {
    debugger
    this.openModalSubject.next(true);
  }

  getModalStatus() {
    return this.openModalSubject.asObservable();
  }

  closeModal() {
    this.openModalSubject.next(false);
  }
}
