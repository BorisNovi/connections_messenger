import { Component, Input, OnInit } from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() dataFromSearchResultsBlock: SearchItemModel | undefined;

  id = '';

  title = '';

  preview = '';

  ngOnInit() {
    if (this.dataFromSearchResultsBlock) {
      const { snippet, id } = this.dataFromSearchResultsBlock;
      this.title = snippet.title;
      this.preview = snippet.thumbnails.standard.url;
      this.id = id;
    }
  }
}
