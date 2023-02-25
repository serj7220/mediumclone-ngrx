import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {PopularTagType} from '../../../types/popular-tag.type';
import {environment} from '../../../../../environments/environment';
import {GetPopularTagsResponseInterface} from '../types/get-popular-tags-response.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';

    return this.http.get<PopularTagType[]>(url).pipe(
      // @ts-ignore
      map((response: GetPopularTagsResponseInterface) => {
        return response.tags;
      })
    );
  }
}
