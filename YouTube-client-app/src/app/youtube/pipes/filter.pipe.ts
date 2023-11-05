import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemModel } from '../models/search/search-item.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: SearchItemModel[], keyword: string): SearchItemModel[] {
    return array.filter((item) => item.snippet.title
      .toLowerCase().includes(keyword));
  }
}
