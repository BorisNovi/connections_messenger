import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: SearchItemModel[], ...args: string[]): SearchItemModel[] {
    if (!args[0]) {
      return array;
    }

    const searchTerm = args.join(' ').toLowerCase();

    const sorted = array.filter((item) => item.snippet.title.toLowerCase().includes(searchTerm));
    return sorted;
  }
}
