import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserModule} from '@angular/platform-browser';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';

import {AppComponent} from 'src/app/app.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {ArticleModule} from './article/article.module';
import {environment} from '../environments/environment';
import {TagFeedModule} from './tag-feed/tag-feed.module';
import {YourFeedModule} from './your-feed/your-feed.module';
import {GlobalFeedModule} from './global-feed/global-feed.module';
import {TopBarModule} from './shared/modules/top-bar/top-bar.module';
import {EditArticleModule} from './edit-article/edit-article.module';
import {PersistanceService} from './shared/services/persistance.service';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';
import {CreateArticleModule} from './create-article/create-article.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    HttpClientModule,
    EffectsModule.forRoot([]),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
