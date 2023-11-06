import { Component, Signal } from '@angular/core';
import { SEARCH_RESULTS } from 'src/assets/mock_data/search-results';
import { ForMockedDataService } from '../../services/ForMockedData.service';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  dataForSearch: SearchItemModel[] = SEARCH_RESULTS.items;

  searchTerm: Signal<string> = this.dataSharingService.currentSearchTerm;

  sortParamsToResult: ISort | undefined;

  keywordToResult = '';

  constructor(
    private dataService: ForMockedDataService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {
  }

  onSortParamsChange(sortParams: ISort) {
    this.sortParamsToResult = sortParams;
  }

  onKeywordChange(keyword: string): void {
    this.keywordToResult = keyword;
  }
}
