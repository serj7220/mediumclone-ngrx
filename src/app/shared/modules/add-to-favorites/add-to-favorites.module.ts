import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';

import {AddToFavoritesService} from './services/add-to-favorites.service';
import {AddToFavoritesEffect} from './store/effects/add-to-favorites.effect';
import {AddToFavoritesComponent} from './components/add-to-favorites/add-to-favorites.component';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
