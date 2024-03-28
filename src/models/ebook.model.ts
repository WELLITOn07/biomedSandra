export interface Ebook {
  id: string,
  title: string;
  description: string;
  subjects: {
    [subject: string]: string[];
  };
  price: {
    original: string;
    discounted: string;
  };
  cover: string;
}

export enum EbookHotmartUrls {
  biomedic = 'https://hotmart.com/product/manual-do-biomedico',
  hematologia = 'https://hotmart.com/product/hematologia',
  bioquimica = 'https://hotmart.com/product/bioquimica',
  urinalise = 'https://hotmart.com/product/urinalise',
  liquidoCefalorraquidiano = 'https://hotmart.com/product/liquido-cefalorraquidiano',
}
