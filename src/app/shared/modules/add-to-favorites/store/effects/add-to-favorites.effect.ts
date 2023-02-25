import {Injectable} from '@angular/core';
import {catchError, map, of, switchMap} from 'rxjs';
import {createEffect, Actions, ofType} from '@ngrx/effects';

import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction,
} from '../actions/add-to-favorites.action';
import {ArticleInterface} from '../../../../types/article.interface';
import {AddToFavoritesService} from '../../services/add-to-favorites.service';

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article});
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private addToFavoritesService: AddToFavoritesService) {}
}
