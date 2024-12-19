import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EbookListComponent } from '../../components/ebook-list/book-list.component';
import { HomePresentation } from '../../models/homePresentation.model';
import { GlobalInformationsService } from '../../services/global-informations.service';
import { Observable, Subscription } from 'rxjs';
import { SubscriptionModalComponent } from '../../components/subscription-modal/subscription-modal';
import { EmailSubscriptionService } from '../../services/email-subscription.service';


@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    HeaderComponent,
    EbookListComponent,
    SubscriptionModalComponent,
  ],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  homePresentation!: Observable<HomePresentation>;
  userHasSubscribed$!: Observable<boolean>;
  hasSubscribed: boolean = false;
  private subscription = new Subscription();
  showModal: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
    private globalInformationsService: GlobalInformationsService,
    private emailSubscriptionService: EmailSubscriptionService
  ) {}

 ngOnInit(): void {
    this.homePresentation = this.globalInformationsService.getHomePresentation();
    this.userHasSubscribed$ = this.emailSubscriptionService.hasUserSubscribed();

    this.subscription.add(
      this.emailSubscriptionService.hasModalBeenShown().subscribe((modalShown) => {
        this.showModal = !modalShown && !this.hasSubscribed;
        this.cdr.detectChanges();
      })
    );

    this.subscription.add(
      this.userHasSubscribed$.subscribe((hasSubscribed) => {
        this.hasSubscribed = hasSubscribed;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toBrowse(social: string): void {
    this.redirectionService.goTo(social);
  }

  openListEbooks(): void {
    this.cdr.detectChanges();
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }
    element.scrollIntoView({ behavior: 'smooth' });
  }
}


