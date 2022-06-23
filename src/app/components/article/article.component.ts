import { Component, Input } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

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
    private actionsSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing
  ) {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    }
    window.open(this.article.url, '_blank');
  }

  async openOptions() {
    const shareBtn = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };

    const normalBtns = [
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
    ];

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionsSheetCtrl.create({
      header: 'Options',
      buttons: normalBtns,
    });

    await actionSheet.present();
  }

  onShareArticle() {
    const { title, source, url } = this.article;
    this.socialSharing.share(title, source.name, null, url);
  }

  onToggleFavorite() {
    console.log('Favorite');
  }
}
