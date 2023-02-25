import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './store/reducers';
import {AuthRoutingModule} from 'src/app/auth/auth-routing.module';
import {RegisterComponent} from 'src/app/auth/components/register/register.component';
import {AuthService} from './services/auth.service';
import {RegisterEffect} from './store/effects/register.effect';
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module';
import {PersistanceService} from '../shared/services/persistance.service';
import {LoginComponent} from './components/login/login.component';
import {LoginEffect} from './store/effects/login.effect';
import {GetCurrentUserEffect} from './store/effects/get-current-user.effect';
import {UpdateCurrentUserEffect} from './store/effects/update-current-user.effect';
import {LogoutEffect} from './store/effects/logout.effect';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
