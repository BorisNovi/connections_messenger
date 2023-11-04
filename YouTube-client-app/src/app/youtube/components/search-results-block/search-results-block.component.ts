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
    this.sortCards(this.sortParams, this.keyword);
  }

  sortCards(sortParams: ISort | undefined, keyword: string): void {
    if (sortParams?.filterType) {
      if (sortParams.filterType === 'date') {
        this.sortByDate(sortParams.direction);
        this.renderCards();
        this.filterByKeyword(keyword);
      } else if (sortParams.filterType === 'count') {
        this.sortByViewCount(sortParams.direction);
        this.renderCards();
        this.filterByKeyword(keyword);
      }
    }
  }

  sortByDate(direction: string): void {
    const dateMultiplier = direction === 'asc' ? 1 : -1;
    this.dataFromSearch.sort((a, b) => dateMultiplier
      * (+(new Date(a.snippet.publishedAt)) - +(new Date(b.snippet.publishedAt))));
  }

  sortByViewCount(direction: string): void {
    const viewCountMultiplier = direction === 'asc' ? 1 : -1;
    this.dataFromSearch.sort((a, b) => viewCountMultiplier
      * (+a.statistics.viewCount - +b.statistics.viewCount));
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
