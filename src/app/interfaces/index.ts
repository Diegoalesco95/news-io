export interface Source {
  id?: string;
  name: string;
}

export interface Article {
  author?: string;
  content?: string;
  description?: string;
  publishedAt: Date;
  source: Source;
  title: string;
  url: string;
  urlToImage?: string;
}

export interface NewsResponse {
  articles: Article[];
  status: string;
  totalResults: number;
}
