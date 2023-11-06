import {
  Injectable, Signal, WritableSignal, computed, signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeHeaderDataSharingService {
  private searchTerm: WritableSignal<string> = signal('');

  currentSearchTerm: Signal<string> = computed(this.searchTerm);

  updSearchTerm(newSearchTerm: string): void {
    this.searchTerm.set(newSearchTerm);
    console.log('Search term upadated: ', this.currentSearchTerm());
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() { }
}
