import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

import {reducers} from './store/reducers';
import {EditArticleService} from './services/edit-article.service';
import {UpdateArticleEffect} from './store/effects/update-article.effect';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {EditArticleComponent} from './components/edit-article/edit-article.component';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {GetArticleEffect} from './store/effects/get-article.effect';
import {LoadingModule} from '../shared/modules/loading/loading.module';

const routes: Route[] = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
