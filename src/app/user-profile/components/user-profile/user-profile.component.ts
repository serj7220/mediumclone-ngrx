import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {combineAll, combineLatest, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserProfileAction} from '../../store/actions/get-user-profile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile!: ProfileInterface;
  isLoading$!: Observable<boolean>;
  errors$!: Observable<string | null>;
  userProfileSubscription!: Subscription;
  slug!: string;
  apiUrl!: string;
  isCurrentUserProfile$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  private initializeValues(): void {
    // @ts-ignore
    this.slug = this.route.snapshot.paramMap.get('slug');
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.errors$ = this.store.pipe(select(errorSelector));
    // @ts-ignore
    this.isCurrentUserProfile$ = combineLatest(
      // @ts-ignore
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      // @ts-ignore
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
        return currentUser.username === userProfile.username;
      })
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      // @ts-ignore
      .pipe(select(userProfileSelector))
      // @ts-ignore
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
