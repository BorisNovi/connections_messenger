import {
  Injectable, Signal, WritableSignal, computed, signal
} from '@angular/core';
import { ISort } from '../models/search/sort-params.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHeaderDataSharingService {
  private searchTerm: WritableSignal<string> = signal('');
  currentSearchTerm: Signal<string> = computed(this.searchTerm);

  private sortParams: WritableSignal<ISort> = signal({ filterType: '', direction: '' });
  currentSortParams: Signal<ISort> = computed(this.sortParams);

  private keyword: WritableSignal<string> = signal('');
  currentKeyword: Signal<string> = computed(this.keyword);

  private isSortingOpen: WritableSignal<boolean> = signal(false);
  currentSortingOpenState: Signal<boolean> = computed(this.isSortingOpen);

  updSearchTerm(newSearchTerm: string): void {
    this.searchTerm.set(newSearchTerm);
  }

  updSortParams(newSortParams: ISort): void {
    this.sortParams.set(newSortParams);
  }

  updKeyword(newKeyword: string): void {
    this.keyword.set(newKeyword);
  }

  updSortingOpenState(isOpen: boolean): void {
    this.isSortingOpen.set(isOpen);
  }
}
