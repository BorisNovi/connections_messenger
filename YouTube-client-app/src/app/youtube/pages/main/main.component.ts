import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForMockedDataService } from '../../services/ForMockedData.service';
import { SearchResponseModel } from '../../models/search/search-response.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  constructor(private dataSrvice: ForMockedDataService) {
  }

  ngOnInit(): void {
    this.showData();
  }

  showData(): void {
    this.subscription = this.dataSrvice.getMockedData().subscribe((data: SearchResponseModel) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
