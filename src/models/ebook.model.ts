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
  works: PublishedWork[];
}

export interface EbookSubject {
  category: string;
  topics: string[];
}

export interface PublishedWork {
  title: string;
  url: string;
}


