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
