import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {reducers} from './store/reducers';
import {LoadingModule} from '../loading/loading.module';
import {PopularTagsService} from './services/popular-tags.service';
import {ErrorMessageModule} from '../error-message/error-message.module';
import {GetPopularTagsEffect} from './store/effects/get-popular-tags.effect';
import {PopularTagsComponent} from './components/popular-tags/popular-tags.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    LoadingModule,
    ErrorMessageModule,
    RouterModule,
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
