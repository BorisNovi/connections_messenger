import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  template: `
  <button [ngClass]="className" style="height: 32px; width: 120px" mat-raised-button color="primary">
  <ng-content></ng-content>
  </button>
`
})
export class CustomButtonComponent {
  @Input() className = '';
}
