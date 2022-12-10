export interface Movie {
  id: string;
  title: string;
  summary: string;
  author: string;
  poster: string;
  cover: string;
  duration: string;
  pubdate: string;
  rate: string;
  isPlay: "0" | "1";
  video: string;
  viewCount: number;
  casts: Performer[];
  movieTypes: Category[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Performer {
  avatar: string;
  name: string;
}
