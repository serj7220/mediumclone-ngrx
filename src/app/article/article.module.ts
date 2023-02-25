import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

import {reducers} from './store/reducers';
import {GetArticleEffect} from './store/effects/get-article.effect';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ArticleComponent} from './components/article/article.component';
import {TagListModule} from '../shared/modules/tag-list/tag-list.module';
import {ErrorMessageModule} from '../shared/modules/error-message/error-message.module';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffect} from './store/effects/delete-article.effect';

const routes: Route[] = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
