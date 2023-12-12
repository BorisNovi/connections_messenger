import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { setGroupListItems } from 'src/app/NgRx/actions/group-list.action';
import { ApiGroupListService } from '../../services/api-group-list.service';
import { IGroupItem, IGroupListResponse } from '../../models/group-list-response.model';
import { selectGroupListItems } from 'src/app/NgRx/selectors/group-list.selector';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groupList!: IGroupItem[];

  constructor(
    private apiGroupListService: ApiGroupListService,
    private destroyRef: DestroyRef,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getGroupList();
  }

  getGroupList(): void {
    this.store.select(selectGroupListItems).subscribe((data) => console.log(data));
    this.apiGroupListService.getGroupList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(((data) => {
        console.log('Groups list', data);
        this.groupList = data.Items;
        this.store.dispatch(setGroupListItems({ groupItems: data.Items }));
      }));
  }

  testCreate() {
    this.apiGroupListService.createGroup('Bob test group')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(((data) => console.log(data)));
  }

  testDelete() {
    this.apiGroupListService.deleteGroup('dvardjpps4c')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(((data) => console.log(data)));
  }
}
