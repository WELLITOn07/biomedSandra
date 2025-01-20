export enum EbookOrder {
  hemograma_curso = 1,
  biomedic = 2,
  atlas_ilustrado_hematologia = 3,
  hematologia = 4,
  apostila_coleta_sanguinea = 5,
  urinalise = 6,
  bioquimica = 7,
  liquidoCefalorraquidiano = 8,
}

export interface Price {
  original: string;
  discounted: string;
}

export interface Subject {
  id: number;
  category: string;
  topics: string[];
}

export interface Work {
  id: number;
  title: string;
  url: string;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  type: string;
  price: Price;
  installmentsCount: number;
  installmentsValue: string;
  subjects: Subject[];
  works: Work[];
}

export interface EbooksPayload {
  statusCode: number;
  message: string;
  data: Ebook[];
}
