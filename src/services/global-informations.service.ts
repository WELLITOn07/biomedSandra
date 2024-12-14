import { HomePresentation } from './../models/homePresentation.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalInformationsService {
  private homePresentation: HomePresentation = {
    greetingText: 'Olá, Biolovers!',
    apresentationText: 'Desenvolva análises de excelência, através de Cursos e E-books que oferecem conhecimentos práticos e experiências reais.',
    author: 'Sandra Kotovicz',
    qualifications: 'Habilitação em Análises Clínicas, Hematologia, Biologia Molecular e Saúde Pública.',
    crbm: 'CRBM 4865',
  };

  getHomePresentation(): Observable<HomePresentation> {
    return of(this.homePresentation);
  }
}
