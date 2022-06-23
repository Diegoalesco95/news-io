import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsResponse,
} from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private articlesByCategoryAndPages: ArticlesByCategoryAndPage = {};

  constructor(private httpClient: HttpClient) {}

  getTopHeadlinesByCategory(
    category: string,
    loadMore = false
  ): Observable<Article[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPages[category]) {
      return of(this.articlesByCategoryAndPages[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string) {
    if (!Object.keys(this.articlesByCategoryAndPages).includes(category)) {
      this.articlesByCategoryAndPages[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPages[category].page + 1;

    return this.executeQuery<NewsResponse>({ category, page }).pipe(
      map(({ articles }) => {
        if (articles.length === 0) {
          return this.articlesByCategoryAndPages[category].articles;
        }

        this.articlesByCategoryAndPages[category] = {
          page,
          articles: [
            ...this.articlesByCategoryAndPages[category].articles,
            ...articles,
          ],
        };

        return this.articlesByCategoryAndPages[category].articles;
      })
    );
  }

  private executeQuery<T>(params: { [key: string]: string | number }) {
    return this.httpClient.get<T>(`${this.apiUrl}/top-headlines`, {
      params: {
        ...params,
        country: 'us',
        apiKey: this.apiKey,
      },
    });
  }
}
