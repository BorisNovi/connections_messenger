import {
  Component, OnDestroy, OnInit, Signal
} from '@angular/core';
import { SEARCH_RESULTS } from 'src/assets/mock_data/search-results';
import { Subscription } from 'rxjs';
import { YoutubeMockDataService } from '../../services/youtube-mock-data.service';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';
import { SearchResponseModel } from '../../models/search/search-response.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  dataForSearch: SearchItemModel[] = SEARCH_RESULTS.items;

  searchTerm: Signal<string> = this.dataSharingService.currentSearchTerm;

  sortParams: Signal<ISort> = this.dataSharingService.currentSortParams;

  keyword: Signal<string> = this.dataSharingService.currentKeyword;

  constructor(
    private dataService: YoutubeMockDataService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {}

  ngOnInit() {
    this.subscription = this.dataService.getMockedData()
      .subscribe((data: SearchResponseModel) => {
        // this.dataForSearch = data.items;
        console.log(data.items);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
