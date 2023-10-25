import { Component, Input, OnInit } from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() dataFromSearchResultsBlock: SearchItemModel | undefined;

  title = '';

  ngOnInit() {
    this.title = this.dataFromSearchResultsBlock?.snippet.title || '';
  }
}
