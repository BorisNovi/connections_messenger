import {
  Component, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss']
})
export class SearchResultsBlockComponent implements OnChanges {
  @Input() dataFromSearch: SearchItemModel[] = [];

  @Input() allowRender: boolean | undefined;

  @Input() sortParams: string[] | undefined;

  @Input() keyword: string | undefined;

  filteredDataToCards: SearchItemModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowRender'] && changes['allowRender'].currentValue === true) {
      this.renderCards();
    }
    this.sortCards(this.sortParams, this.keyword);
  }

  sortCards(filterParams: string[] | undefined, keyword: string | undefined): void {
    if (filterParams) {
      if (filterParams[0] === 'date') {
        this.sortByDate(filterParams[1]);
        this.renderCards();
      } else if (filterParams[0] === 'count') {
        this.sortByViewCount(filterParams[1]);
        this.renderCards();
      } else if (filterParams[0] === 'word') {
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
