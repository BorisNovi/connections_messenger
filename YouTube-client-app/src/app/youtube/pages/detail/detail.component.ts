import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeMockDataService } from '../../services/youtube-mock-data.service';
import { SearchItemModel } from '../../models/search/search-item.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private dataSubscription!: Subscription;
  private routeSubscription!: Subscription;
  private id = '';
  data!: SearchItemModel;
  video!: SafeResourceUrl;

  constructor(
    private dataService: YoutubeMockDataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.dataSubscription = this.dataService.getMockedDataById(this.id)
      .subscribe((data: SearchItemModel[]) => {
        [this.data] = data;
      });

    const embedVideo = `https://www.youtube.com/embed/${this.id}`;
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(embedVideo);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
