import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';

import {PopularTagType} from '../../../../types/popular-tag.type';
import {getPopularTagsAction} from '../../store/actions/get-popular-tags.action';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$!: Observable<PopularTagType[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    // @ts-ignore
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction());
  }
}
