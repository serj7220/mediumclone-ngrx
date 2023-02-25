import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

import {reducers} from './store/reducers';
import {CreateArticleService} from './services/create-article.service';
import {CreateArticleEffect} from './store/effects/create-article.effect';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {CreateArticleComponent} from './components/create-article/create-article.component';

const routes: Route[] = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers),
  ],
  declarations: [CreateArticleComponent],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
