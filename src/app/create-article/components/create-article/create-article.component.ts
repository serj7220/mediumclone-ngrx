import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';

import {createArticleAction} from '../../store/actions/create-article.action';
import {ArticleInputInterface} from '../../../shared/types/article-input.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';

@Component({
  selector: 'mc-create-article',
  templateUrl: 'create-article.component.html',
  styleUrls: ['create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    // @ts-ignore
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    // @ts-ignore
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    articleInput.tagList = articleInput.tagList.toString().split(' ');
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
