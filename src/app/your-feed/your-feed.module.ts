import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FeedModule} from '../shared/modules/feed/feed.module';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {YourFeedComponent} from './components/your-feed/your-feed.component';
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module';
import {FeedTogglerModule} from '../shared/modules/feed-toggler/feed-toggler.module';

const routers = [
  {
    path: 'feed',
    component: YourFeedComponent,
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
  declarations: [YourFeedComponent],
})
export class YourFeedModule {}
