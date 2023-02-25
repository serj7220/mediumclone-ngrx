import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {Route, RouterModule} from '@angular/router';
import {UserProfileService} from './services/user-profile.service';
import {EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffect} from './store/effects/get-user-profile.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {FeedModule} from '../shared/modules/feed/feed.module';

const routes: Route[] = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];
@NgModule({
  imports: [
    FeedModule,
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService],
})
export class UserProfileModule {}
