import {
  Injectable, Signal, WritableSignal, computed, signal
} from '@angular/core';
import { ISort } from '../models/search/sort-params.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHeaderDataSharingService {
  private searchTerm: WritableSignal<string> = signal('');

  private sortParams: WritableSignal<ISort> = signal({ filterType: '', direction: '' });

  private keyword: WritableSignal<string> = signal('');

  currentSearchTerm: Signal<string> = computed(this.searchTerm);

  currentSortParams: Signal<ISort> = computed(this.sortParams);

  currentKeyword: Signal<string> = computed(this.keyword);

  updSearchTerm(newSearchTerm: string): void {
    this.searchTerm.set(newSearchTerm);
    console.log('Search term upadated: ', this.currentSearchTerm());
  }

  updSortParams(newSortParams: ISort): void {
    this.sortParams.set(newSortParams);
    console.log('Sort params upadated: ', this.currentSortParams());
  }

  updKeyword(newKeyword: string): void {
    this.keyword.set(newKeyword);
    console.log('Keyword upadated: ', this.currentKeyword());
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() { }
}
