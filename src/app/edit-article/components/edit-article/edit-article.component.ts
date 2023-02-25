import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';

import {updateArticleAction} from '../../store/actions/update-article.action';
import {ArticleInputInterface} from '../../../shared/types/article-input.interface';
import {articleSelector, isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from '../../store/actions/get-article.action';
import {ArticleInterface} from '../../../shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: 'edit-article.component.html',
  styleUrls: ['edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface>;
  isSubmitting$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  slug!: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    articleInput.tagList = articleInput.tagList.toString().split(' ');
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }

  initializeValues(): void {
    //@ts-ignore
    this.slug = this.route.snapshot.paramMap.get('slug');
    //@ts-ignore
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    //@ts-ignore
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    //@ts-ignore
    this.initialValues$ = this.store.pipe(
      //@ts-ignore
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }
}
