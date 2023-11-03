import { Component, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { SEARCH_RESULTS } from 'src/assets/mock_data/search-results';
import { ForMockedDataService } from '../../services/ForMockedData.service';
import { SearchResponseModel } from '../../models/search/search-response.model';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  subscription: Subscription | undefined;

  dataForSearch: SearchItemModel[] = [];

  searchTerm = '';

  sortDataToResult: ISort | undefined;

  constructor(private dataService: ForMockedDataService) {
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
    this.showItems();
  }

  onSortDataChange(sortData: ISort) {
    this.sortDataToResult = sortData;
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
