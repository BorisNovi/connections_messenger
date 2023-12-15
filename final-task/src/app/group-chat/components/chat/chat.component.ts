import { Component, DestroyRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalService } from 'src/app/core/services/local.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiGroupChatService } from '../../services/api-group-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  delay = 2000;
  isRefreshDisabled = false;
  myUid = this.localService.getData('uid');
  private currentGroupId = '';
  private routeSubscription!: Subscription;

  constructor(
    private apiGroupChatService: ApiGroupChatService,
    private destroyRef: DestroyRef,
    private store: Store,
    private snackBar: MatSnackBar,
    private localService: LocalService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.currentGroupId = params['groupID'];
    });

    console.log(this.currentGroupId);

    this.apiGroupChatService.getGroupMessages(this.currentGroupId)
      .subscribe((messages) => console.log(messages));
  }
}
