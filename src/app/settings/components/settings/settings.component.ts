import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {Observable, Subscription} from 'rxjs';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter} from 'rxjs/operators';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {updateCurrentUserAction} from '../../../auth/store/actions/update-current-user.action';
import {CurrentUserInputInterface} from '../../../shared/types/current-user-input.interface';
import {logoutAction} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser!: CurrentUserInterface;
  currentUserSubscription!: Subscription;
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      // @ts-ignore
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  initializeValues(): void {
    // @ts-ignore
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    // @ts-ignore
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
