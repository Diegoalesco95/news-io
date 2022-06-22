import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.httpClient
      .get<NewsResponse>(`${this.apiUrl}/top-headlines`, {
        params: {
          country: 'us',
          category: 'business',
          apiKey: this.apiKey,
        },
      })
      .pipe(map(({ articles }) => articles));
  }

  getTopHeadlinesByCategory(category: string): Observable<Article[]> {
    return this.httpClient
      .get<NewsResponse>(`${this.apiUrl}/top-headlines`, {
        params: {
          country: 'us',
          category,
          apiKey: this.apiKey,
        },
      })
      .pipe(map(({ articles }) => articles));
  }
}
