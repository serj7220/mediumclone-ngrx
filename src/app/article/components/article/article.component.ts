import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from '../../store/actions/get-article.action';
import {ActivatedRoute} from '@angular/router';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {combineLatest, map, Observable, Subscription} from 'rxjs';
import {articleSelector, isLoadingSelector, errorSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {deleteArticleAction} from '../../store/actions/delete-article.action';

@Component({
  selector: 'mc-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug = '';
  article: ArticleInterface | undefined;
  articleSubscription: Subscription | undefined;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues() {
    this.slug = this.route.snapshot.paramMap.get('slug')!.toString();
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      // @ts-ignore
      this.store.pipe(select(articleSelector)),
      // @ts-ignore
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
        if (!article || !currentUser) {
          return false;
        }
        return currentUser.username === article.author.username;
      })
    );
  }

  initializeListeners() {
    this.articleSubscription = this.store
      // @ts-ignore
      .pipe(select(articleSelector))
      // @ts-ignore
      .subscribe((article: ArticleInterface | undefined) => {
        this.article = article;
      });
  }

  fetchData() {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  deleteArticle() {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }

  ngOnDestroy() {
    this.articleSubscription?.unsubscribe();
  }
}
