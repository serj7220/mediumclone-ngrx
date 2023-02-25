import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UtilsService} from '../../services/utils.service';
import {PaginationComponent} from './components/pagination/pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService],
})
export class PaginationModule {}
