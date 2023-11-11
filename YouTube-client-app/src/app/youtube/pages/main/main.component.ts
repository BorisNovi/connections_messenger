import {
  Component, OnDestroy, OnInit, Signal
} from '@angular/core';
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

  dataForSearch!: SearchItemModel[];

  searchTerm: Signal<string> = this.dataSharingService.currentSearchTerm;

  sortParams: Signal<ISort> = this.dataSharingService.currentSortParams;

  keyword: Signal<string> = this.dataSharingService.currentKeyword;

  isSortingOpen: Signal<boolean> = this.dataSharingService.currentSortingOpenState;

  constructor(
    private dataService: YoutubeMockDataService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {}

  ngOnInit() {
    this.subscription = this.dataService.getMockedData()
      .subscribe((data: SearchResponseModel) => {
        this.dataForSearch = data.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
