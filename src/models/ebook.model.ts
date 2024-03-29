export interface Ebook {
  title: string;
  description: string;
  subjects: EbookSubject[];
  price: {
    original: string;
    discounted: string;
  };
  cover: string;
  id: string;
  url: string;
}

export interface EbookSubject {
  category: string;
  topics: string[];
}

export enum EbookHotmartUrls {
  biomedic = 'https://hotmart.com/product/manual-do-biomedico',
  hematologia = 'https://hotmart.com/product/hematologia',
  bioquimica = 'https://hotmart.com/product/bioquimica',
  urinalise = 'https://hotmart.com/product/urinalise',
  liquidoCefalorraquidiano = 'https://hotmart.com/product/liquido-cefalorraquidiano',
}
