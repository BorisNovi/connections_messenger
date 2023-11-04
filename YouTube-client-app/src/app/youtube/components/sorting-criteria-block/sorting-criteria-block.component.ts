import { Component, EventEmitter, Output } from '@angular/core';
import { ISort } from '../../models/search/sort-params.model';

enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

@Component({
  selector: 'app-sorting-criteria-block',
  templateUrl: './sorting-criteria-block.component.html',
  styleUrls: ['./sorting-criteria-block.component.scss']
})
export class SortingCriteriaBlockComponent {
  @Output() sortParamsToHeader = new EventEmitter<ISort>();

  @Output() keywordToHeader = new EventEmitter<string>();

  filterType = '';

  keyword = '';

  sortDirection = false; // false - asc, true - desc

  onSortClick(): void {
    this.sortDirection = !this.sortDirection;
    const stringSortDirection = this.sortDirection ? Direction.DESC : Direction.ASC;

    this.sortParamsToHeader.emit(
      {
        filterType: this.filterType,
        direction: stringSortDirection,
      }
    );
  }

  onKeywordChange(): void {
    this.keywordToHeader.emit(this.keyword);
  }
}
