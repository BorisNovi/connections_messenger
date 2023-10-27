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
  @Input() filteredData: SearchItemModel[] = [];

  @Input() allowRender: boolean | undefined;

  @Input() sortParams: string[] | undefined;

  @Input() keyword: string | undefined;

  filteredDataToCards: SearchItemModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowRender'] && changes['allowRender'].currentValue === true) {
      this.renderCards();
    }

    this.sortCards(this.sortParams, '');
  }

  sortCards(filterParams: string[] | undefined, keyword: string): void {
    if (filterParams) {
      if (filterParams[0] === 'date') {
        this.sortByDate(filterParams[1]);
      } else if (filterParams[0] === 'count') {
        this.sortByViewCount(filterParams[1]);
      } else if (filterParams[0] === 'word') {
        this.filterByKeyword(keyword);
      }
    }
    console.log(this.filteredData);
  }

  sortByDate(direction: string): void {
    const dateMultiplier = direction === 'asc' ? 1 : -1;
    this.filteredData.sort((a, b) => dateMultiplier
     * (+(new Date(a.snippet.publishedAt)) - +(new Date(b.snippet.publishedAt))));
  }

  sortByViewCount(direction: string): void {
    const viewCountMultiplier = direction === 'asc' ? 1 : -1;
    this.filteredData.sort((a, b) => viewCountMultiplier
    * (+a.statistics.viewCount - +b.statistics.viewCount));
  }

  filterByKeyword(keyword: string): void {
    let key = keyword;
    key = key.toLowerCase();
    this.filteredData = this.filteredData.filter((item) => item.snippet.title
      .toLowerCase().includes(key));
  }

  renderCards(): void {
    this.filteredDataToCards = this.filteredData;
  }
}
