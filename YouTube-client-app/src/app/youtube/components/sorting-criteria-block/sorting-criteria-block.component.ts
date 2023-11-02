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
  @Output() sortDataToHeader = new EventEmitter<ISort>();

  filterType = '';

  keyword = '';

  sortDirection = false; // false - asc, true - desc

  onSortClick(): void {
    this.sortDirection = !this.sortDirection;
    const stringSortDirection = this.sortDirection ? Direction.DESC : Direction.ASC;

    this.sortDataToHeader.emit(
      {
        filterType: this.filterType,
        direction: stringSortDirection,
        keyword: this.keyword
      }
    );
  }

  onKeywordChange(): void {
    const stringSortDirection = this.sortDirection ? Direction.DESC : Direction.ASC;
    this.sortDataToHeader.emit(
      {
        filterType: this.filterType,
        direction: stringSortDirection,
        keyword: this.keyword
      }
    );
  }
}
