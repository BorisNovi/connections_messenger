import { Component, Input, } from '@angular/core';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() searchItem!: SearchItemModel;
}
