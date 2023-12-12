import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiGroupListService } from '../../services/api-group-list.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  constructor(
    private apiGroupListService: ApiGroupListService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.apiGroupListService.getGroupList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(((data) => console.log('Groups list', data)));
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
