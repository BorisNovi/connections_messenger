import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-criteria-block',
  templateUrl: './sorting-criteria-block.component.html',
  styleUrls: ['./sorting-criteria-block.component.scss']
})
export class SortingCriteriaBlockComponent {
  @Output() sortParamsToHeader = new EventEmitter<(string)[]>();

  @Output() keywordToHeader = new EventEmitter<string>();

  filterType = '';

  keyword = '';

  sortDirection = false; // false - asc, true - desc

  onSortClick(): void {
    this.sortDirection = !this.sortDirection;
    const stringSortDirection = this.sortDirection ? 'desc' : 'asc';
    const sortGroup = [this.filterType, stringSortDirection];

    this.sortParamsToHeader.emit(sortGroup);
  }

  onKeywordChange(): void {
    this.keywordToHeader.emit(this.keyword);
  }
}
