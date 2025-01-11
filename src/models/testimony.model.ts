export interface Testimony {
  id: number;
  author: string;
  rating: number;
  text: string;
}

export interface TestimonyData {
  hemograma_curso: Testimony[];
  biomedic: Testimony[];
  bioquimica: Testimony[];
  urinalise: Testimony[];
  hematologia: Testimony[];
  liquidoCefalorraquidiano: Testimony[];
}
