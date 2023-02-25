import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FeedModule} from '../shared/modules/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {TagFeedComponent} from './components/tag-feed/tag-feed.component';
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module';
import {FeedTogglerModule} from '../shared/modules/feed-toggler/feed-toggler.module';

const routers = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
  declarations: [TagFeedComponent],
})
export class TagFeedModule {}
