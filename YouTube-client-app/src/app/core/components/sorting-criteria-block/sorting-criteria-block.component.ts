import { Component, EventEmitter, Output } from '@angular/core';
import { YoutubeHeaderDataSharingService } from '../../../youtube/services/youtube-header-data-sharing.service';

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
  @Output() keywordToHeader = new EventEmitter<string>();

  filterType = '';

  sortDirection = false; // false - asc, true - desc

  constructor(
    private dataSharingService: YoutubeHeaderDataSharingService
  ) {}

  onSortClick(): void {
    this.sortDirection = !this.sortDirection;
    const stringSortDirection = this.sortDirection ? Direction.DESC : Direction.ASC;

    this.dataSharingService.updSortParams(
      {
        filterType: this.filterType,
        direction: stringSortDirection,
      }
    );
  }

  onKeywordChange(keyword: string): void {
    this.dataSharingService.updKeyword(keyword);
  }
}
