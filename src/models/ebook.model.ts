export interface Ebook {
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
  Biomedic = 'https://hotmart.com/product/manual-do-biomedico',
  Hematologia = 'https://hotmart.com/product/hematologia',
  Bioquimica = 'https://hotmart.com/product/bioquimica',
  Urinalise = 'https://hotmart.com/product/urinalise',
  LiquidoCefalorraquidiano = 'https://hotmart.com/product/liquido-cefalorraquidiano',
}
