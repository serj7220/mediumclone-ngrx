import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsComponent} from './components/settings/settings.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module';

const routers = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    RouterModule.forChild(routers),
    StoreModule.forFeature('settings', reducers),
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
