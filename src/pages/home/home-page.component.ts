import { CommonModule } from '@angular/common';
import { RedirectionService } from './../../services/redirection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { EbookListComponent } from '../../components/ebook-list/book-list.component';
import { HomePresentation } from '../../models/homePresentation.model';
import { GlobalInformationsService } from '../../services/global-informations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, HeaderComponent, EbookListComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  homePresentation!: Observable<HomePresentation>;

  constructor(
    private cdr: ChangeDetectorRef,
    private redirectionService: RedirectionService,
    private globalInformationsService: GlobalInformationsService
  ) {}
  ngOnInit(): void {
    this.homePresentation = this.globalInformationsService.getHomePresentation();
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

