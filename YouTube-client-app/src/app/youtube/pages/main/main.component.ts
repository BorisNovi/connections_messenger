import {
  Component, OnInit, Signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  Observable, Subscription, catchError, debounceTime, filter, of
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
export class MainComponent implements OnInit {
  subscription$!: Subscription;

  dataForSearch!: SearchItemModel[];
  searchTerm$: Observable<string> = toObservable(this.dataSharingService.currentSearchTerm);
  sortParams: Signal<ISort> = this.dataSharingService.currentSortParams;
  keyword: Signal<string> = this.dataSharingService.currentKeyword;

  isSortingOpen: Signal<boolean> = this.dataSharingService.currentSortingOpenState;
  responseError = '';

  termLengthThreshold = 3;
  inputDelay = 1000;
  maxResultsOnPage = 12;

  constructor(
    private apiService: ApiService,
    private dataSharingService: YoutubeHeaderDataSharingService
  ) { }

  ngOnInit(): void {
    this.useSearch();
  }

  private useSearch(): void {
    this.subscription$ = this.searchTerm$
      .pipe(
        debounceTime(this.inputDelay),
        filter((term) => term.length >= this.termLengthThreshold),
        takeUntilDestroyed()
      ).subscribe((term) => {
        this.search(term);
      });
  }

  private search(q: string): void {
    const searchParams: ISearch = {
      q,
      maxResults: this.maxResultsOnPage,
      order: SearchOrder.relevance
    };

    this.subscription$ = this.apiService.searchVideos(searchParams).pipe(
      catchError((error) => { this.responseError = (error.error.error.message); return of(); }),
      takeUntilDestroyed()
    ).subscribe((data: SearchResponseModel) => {
      const videoIdArr = data.items.map((item) => item.id.videoId);
      this.getVideosByIds(videoIdArr);
    });
  }

  public getVideosByIds(idArr: string[]): void {
    this.subscription$ = this.apiService.getVideos(idArr).pipe(
      catchError((error) => { this.responseError = (error.error.error.message); return of(); }),
      takeUntilDestroyed()
    ).subscribe((data: SearchResponseModel) => {
      this.dataForSearch = data.items;
    });
  }
}
