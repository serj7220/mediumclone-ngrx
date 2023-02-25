import {Component, Input} from '@angular/core';
import {PopularTagType} from '../../../../types/popular-tag.type';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
})
export class TagListComponent {
  @Input('tags') tagsProps: PopularTagType[] = [];
}
