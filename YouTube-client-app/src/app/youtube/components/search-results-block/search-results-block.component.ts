import {
  Component, Input, OnChanges
} from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ISort } from '../../models/search/sort-params.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss']
})
export class SearchResultsBlockComponent implements OnChanges {
  @Input() dataFromSearch: SearchItemModel[] = [];

  @Input() sortParams: ISort | undefined;

  @Input() keyword = '';

  filteredDataToCards: SearchItemModel[] | undefined = this.dataFromSearch;

  ngOnChanges(): void {
    this.filteredDataToCards = this.dataFromSearch;
  }
}
