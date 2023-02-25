import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Component, Input, OnInit} from '@angular/core';

import {isLoggedInSelector} from '../../../../../auth/store/selectors';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: 'feed-toggler.component.html',
  styleUrls: ['feed-toggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | undefined;

  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues() {
    // @ts-ignore
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
