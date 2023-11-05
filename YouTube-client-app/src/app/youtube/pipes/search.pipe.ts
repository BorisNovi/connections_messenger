import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemModel } from '../models/search/search-item.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: SearchItemModel[], searchTerm: string): SearchItemModel[] {
    if (!searchTerm) {
      return [];
    }

    const sorted = array.filter((item) => item.snippet.title.toLowerCase().includes(searchTerm));
    return sorted;
  }
}
