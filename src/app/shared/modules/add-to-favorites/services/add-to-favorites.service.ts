import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GetArticleResponseInterface} from '../../../types/get-article-response.interface';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    // @ts-ignore
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    // @ts-ignore
    return this.http.delete(url).pipe(map(this.getArticle));
  }

  getUrl(slug: string) {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
