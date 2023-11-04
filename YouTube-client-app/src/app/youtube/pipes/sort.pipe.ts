import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemModel } from '../models/search/search-item.model';
import { ISort } from '../models/search/sort-params.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: SearchItemModel[], sortParams: ISort | undefined): SearchItemModel[] {
    if (sortParams?.filterType) {
      if (sortParams.filterType === 'date') {
        const dateMultiplier = sortParams.direction === 'asc' ? 1 : -1;
        array.sort((a, b) => dateMultiplier
    * (+(new Date(a.snippet.publishedAt)) - +(new Date(b.snippet.publishedAt))));
      } else if (sortParams.filterType === 'count') {
        const viewCountMultiplier = sortParams.direction === 'asc' ? 1 : -1;
        array.sort((a, b) => viewCountMultiplier
          * (+a.statistics.viewCount - +b.statistics.viewCount));
      }
    }
    return array;
  }
}
