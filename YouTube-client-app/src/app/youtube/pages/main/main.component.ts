import {
  Component, OnDestroy, OnInit, Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  Observable, Subscription, debounceTime,
} from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';
import { YoutubeHeaderDataSharingService } from '../../services/youtube-header-data-sharing.service';
import { SearchResponseModel } from '../../models/search/search-response.model';
import { ISearch, SearchOrder } from '../../models/search/search-params.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  dataForSearch!: SearchItemModel[];
  searchTerm: Observable<string> = toObservable(this.dataSharingService.currentSearchTerm);
  sortParams: Signal<ISort> = this.dataSharingService.currentSortParams;
  keyword: Signal<string> = this.dataSharingService.currentKeyword;
  isSortingOpen: Signal<boolean> = this.dataSharingService.currentSortingOpenState;

  constructor(
    private apiService: ApiService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) { }

  ngOnInit(): void {
    this.useSearch();
  }

  private useSearch(): void {
    this.subscription = this.searchTerm
      .pipe(debounceTime(1000))
      .subscribe((term) => {
        if (term.length >= 3) {
          this.search(term);
        }
      });
  }

  private search(q: string): void {
    const searchParams: ISearch = { q, maxResults: 5, order: SearchOrder.relevance };
    this.subscription = this.apiService.searchVideos(searchParams)
      .subscribe((data: SearchResponseModel) => {
        const videoIdArr = data.items.map((item) => item.id.videoId);
        this.getVideosByTags(videoIdArr);
      });
  }

  public getVideosByTags(idArr: string[]): void {
    this.subscription = this.apiService.getVideos(idArr)
      .subscribe((data: SearchResponseModel) => {
        this.dataForSearch = data.items;
        console.log(data.items);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
