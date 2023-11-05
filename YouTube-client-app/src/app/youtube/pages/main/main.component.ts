import { Component } from '@angular/core';
import { SEARCH_RESULTS } from 'src/assets/mock_data/search-results';
import { ForMockedDataService } from '../../services/ForMockedData.service';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  dataForSearch: SearchItemModel[] = SEARCH_RESULTS.items;

  searchTerm = '';

  sortParamsToResult: ISort | undefined;

  keywordToResult = '';

  constructor(private dataService: ForMockedDataService) {
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
  }

  onSortParamsChange(sortParams: ISort) {
    this.sortParamsToResult = sortParams;
  }

  onKeywordChange(keyword: string): void {
    this.keywordToResult = keyword;
  }
}
