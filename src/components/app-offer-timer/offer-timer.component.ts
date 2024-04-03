import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-offer-timer',
  standalone: true,
  templateUrl: './offer-timer.component.html',
  styleUrls: ['./offer-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOfferTimerComponent implements OnInit, OnDestroy {
  timeUntilOfferEnds: string | null = null;
  private intervalId: number = 0;
  private offerEndTime!: Date;

  constructor(private cdr: ChangeDetectorRef) {
    this.initializeOfferEndTime();
  }

  ngOnInit(): void {
    this.updateTimeUntilOfferEnds();
    this.intervalId = window.setInterval(() => {
      this.updateTimeUntilOfferEnds();
    }, 1000);
  }

  private initializeOfferEndTime(): void {
    const savedEndTime = localStorage.getItem('offerEndTime');
    if (savedEndTime) {
      this.offerEndTime = new Date(savedEndTime);
      const now = new Date();
      if (this.offerEndTime.getTime() - now.getTime() < 1800 * 1000) {
        this.resetOfferEndTime();
      }
    } else {
      this.resetOfferEndTime();
    }
  }

  private resetOfferEndTime(): void {
    const now = new Date();
    this.offerEndTime = new Date(now.getTime() + 26 * 60 * 60 * 1000);
    localStorage.setItem('offerEndTime', this.offerEndTime.toISOString());
  }

  private updateTimeUntilOfferEnds(): void {
    const now = new Date();
    const difference = this.offerEndTime.getTime() - now.getTime();
    if (difference < 0) {
      this.timeUntilOfferEnds = '0d 0hr 0min 0s';
      clearInterval(this.intervalId);
      localStorage.removeItem('offerEndTime');
      this.resetOfferEndTime();
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.timeUntilOfferEnds = `${days}d ${hours}hr ${minutes}min ${seconds}s`;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
