import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SearchItemModel } from '../../models/search/search-item.model';
import { ApiService } from '../../services/api.service';
import { SearchResponseModel } from '../../models/search/search-response.model';

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
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.dataSubscription = this.apiService.getVideos([this.id])
      .subscribe((data: SearchResponseModel) => {
        [this.data] = data.items;
      });

    const embedVideo = `https://www.youtube.com/embed/${this.id}`;
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl(embedVideo);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
