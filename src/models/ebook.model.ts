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
  subjects: Subject[];
  works: Work[];
}

export interface EbooksPayload {
  statusCode: number;
  message: string;
  data: Ebook[]; 
}
