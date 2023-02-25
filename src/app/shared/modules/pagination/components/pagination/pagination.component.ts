import {Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';

import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  // @ts-ignore
  @Input('total') totalProps: number | undefined;
  @Input('limit') limitProps!: number;
  @Input('url') urlProps!: string;
  @Input('currentPage') currentPageProps!: number;

  pagesCount!: number;
  pages: number[] = [];

  constructor(private utilsService: UtilsService, private router: Router) {}

  ngOnInit() {
    // @ts-ignore
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.range(1, this.pagesCount);
  }

  goToPage(page: number) {
    this.router.navigate([`${this.urlProps}`], {queryParams: {page: page}});
  }
}
