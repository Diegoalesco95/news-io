import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces';

import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  selectedCategory: string = this.categories[0];
  articles: Observable<Article[]>;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.articles = this.getArticles();
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.articles = this.getArticles();
  }

  getArticles() {
    return this.newsService.getTopHeadlinesByCategory(this.selectedCategory);
  }
}
