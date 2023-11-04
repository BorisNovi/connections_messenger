import {
  Directive, Input, ElementRef, Renderer2, OnChanges
} from '@angular/core';

@Directive({
  selector: '[appPublishedIndicator]'
})
export class PublishedIndicatorDirective implements OnChanges {
  @Input() publishDate = '';

  colorCounterVariants = ['older6m', 'between1m-6m', 'between7d-1m', 'newer7d'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.setIndicatorClass(this.publishDate);
  }

  private setIndicatorClass(publishDate: string): void {
    const now = new Date();
    const publishDateTime = new Date(publishDate);
    const timeDifference = +now - +publishDateTime;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;

    if (timeDifference >= 6 * month) {
      this.renderer.addClass(this.el.nativeElement, this.colorCounterVariants[0]);
    } else if (timeDifference >= month) {
      this.renderer.addClass(this.el.nativeElement, this.colorCounterVariants[1]);
    } else if (timeDifference >= 7 * day) {
      this.renderer.addClass(this.el.nativeElement, this.colorCounterVariants[2]);
    } else {
      this.renderer.addClass(this.el.nativeElement, this.colorCounterVariants[3]);
    }
  }
}
