import { Component, Input } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionsSheetCtrl: ActionSheetController
  ) {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    }
    window.open(this.article.url, '_blank');
  }

  async openOptions() {
    const actionSheet = await this.actionsSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share',
          icon: 'share-outline',
          handler: () => this.onShareArticle(),
        },
        {
          text: 'Favorite',
          icon: 'heart-outline',
          handler: () => this.onToggleFavorite(),
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'text-red',
        },
      ],
    });

    await actionSheet.present();
  }

  onToggleFavorite() {
    console.log('Favorite');
  }

  onShareArticle() {
    console.log('Share article');
  }
}
