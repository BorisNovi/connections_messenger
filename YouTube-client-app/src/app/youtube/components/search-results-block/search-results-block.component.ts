import {
  Component, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss']
})
export class SearchResultsBlockComponent implements OnChanges {
  @Input() filteredData: SearchItemModel[] = [];

  @Input() allowRender: boolean | undefined;

  filteredDataToCards: SearchItemModel[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allowRender'] && changes['allowRender'].currentValue === true) {
      this.renderCards();
    }
  }

  renderCards() {
    this.filteredDataToCards = this.filteredData;
  }
}
