import {
  Component, Input, OnChanges
} from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss']
})
export class SearchResultsBlockComponent implements OnChanges {
  @Input() dataFromSearch: SearchItemModel[] = [];

  @Input() sortParams: ISort | undefined;

  @Input() keyword = '';

  filteredDataToCards: SearchItemModel[] = [];

  ngOnChanges(): void {
    this.renderCards();
    this.filterByKeyword(this.keyword);
  }

  filterByKeyword(keyword: string | undefined): void {
    let key = keyword || '';
    key = key.toLowerCase();
    const byKeywordSorted = this.dataFromSearch.filter((item) => item.snippet.title
      .toLowerCase().includes(key));
    this.renderCards(byKeywordSorted);
  }

  renderCards(sorted?: SearchItemModel[]): void {
    if (sorted) {
      this.filteredDataToCards = sorted;
    } else {
      this.filteredDataToCards = this.dataFromSearch;
    }
  }
}
