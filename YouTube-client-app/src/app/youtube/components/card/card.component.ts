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

  viewCount = '';

  likeCount = '';

  dislikeCount = '';

  commentCount = '';

  ngOnInit() {
    if (this.dataFromSearchResultsBlock) {
      const { id, snippet, statistics } = this.dataFromSearchResultsBlock;

      this.id = id;
      this.title = snippet.title;
      this.preview = snippet.thumbnails.standard.url;
      this.viewCount = statistics.viewCount;
      this.likeCount = statistics.likeCount;
      this.dislikeCount = statistics.dislikeCount;
      this.commentCount = statistics.commentCount;
    }
  }
}
