import {Injectable} from '@angular/core';
import {catchError, map, of, switchMap} from 'rxjs';
import {createEffect, Actions, ofType} from '@ngrx/effects';

import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '../actions/get-user-profile.action';
import {UserProfileService} from '../../services/user-profile.service';
import {ProfileInterface} from '../../../shared/types/profile.interface';

@Injectable()
export class GetUserProfileEffect {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileSuccessAction({userProfile});
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private userProfileService: UserProfileService) {}
}
