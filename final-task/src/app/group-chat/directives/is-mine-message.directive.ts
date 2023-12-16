import {
  Directive, ElementRef, Input, OnChanges, Renderer2
} from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';

@Directive({
  selector: '[appIsMineMessage]'
})
export class IsMineMessageDirective implements OnChanges {
  @Input() uid = '';

  constructor(
    private localService: LocalService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges() {
    this.isMineMessage(this.uid);
  }

  isMineMessage(authorID: string): void {
    const myUid = this.localService.getData('uid');
    if (authorID === myUid) {
      this.renderer.addClass(this.el.nativeElement, 'mine');
    }
  }
}
