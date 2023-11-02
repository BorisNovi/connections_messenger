import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { SEARCH_RESULTS } from 'src/assets/mock_data/search-results';
import { ForMockedDataService } from '../../services/ForMockedData.service';
import { SearchResponseModel } from '../../models/search/search-response.model';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  dataForSearch: SearchItemModel[] = [];

  searchTerm = '';

  allowRender: boolean | undefined;

  sortParamsToResult: string[] | undefined;

  keywordToResult: string | undefined;

  constructor(private dataService: ForMockedDataService) {
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
  }

  onAllowRenderChange(allow: boolean) {
    this.allowRender = allow;
  }

  onSortParamsChange(params: string[]) {
    this.sortParamsToResult = params;
  }

  onKeywordChange(keyword: string) {
    this.keywordToResult = keyword;
  }

  ngOnInit(): void {
    this.showItems();
  }

  showItems(): void {
    // this.subscription = this.dataService.getMockedData()
    //   .subscribe((data: SearchResponseModel) => {
    //     this.dataForSearch = data.items;
    //   }); // Раскомментировать, когда в сервие будет запрос на реальный url

    this.dataForSearch = [...SEARCH_RESULTS.items];
    // Это временный костыль, так как на проде не подтягивается assets
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
