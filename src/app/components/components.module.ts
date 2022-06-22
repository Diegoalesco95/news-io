import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    HeaderComponent,
    SubHeaderComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ArticlesComponent, HeaderComponent, SubHeaderComponent],
})
export class ComponentsModule {}
