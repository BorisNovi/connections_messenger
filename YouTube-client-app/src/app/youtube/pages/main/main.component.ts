import {
  Component, OnDestroy, OnInit, Signal,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';
import { SearchResponseModel } from '../../models/search/search-response.model';
import { IGet, ISearch, SearchOrder } from '../../models/search/search-params.model';

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
    private apiService: ApiService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {}

  ngOnInit(): void {
    // this.requestRealData(this.searchTerm());

    this.requestRealData('circus');
  }

  requestRealData(q: string): void {
    const searchParams: ISearch = { q, maxResults: 10, order: SearchOrder.relevance };
    this.subscription = this.apiService.searchVideos(searchParams)
      .subscribe((data: SearchResponseModel) => {
        // this.dataForSearch = data.items;
        const ids = data.items.map((item) => item.id.videoId);
        console.log(ids);
      });
  }

  requestRealVideos(idArr: string[]): void {
    const searchParams: IGet = { maxResults: 10, id: idArr };
    this.subscription = this.apiService.getVideos(searchParams)
      .subscribe((data: SearchResponseModel) => {
        this.dataForSearch = data.items;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
