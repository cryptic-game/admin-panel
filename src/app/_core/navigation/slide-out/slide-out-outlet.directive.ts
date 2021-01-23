import {Directive} from '@angular/core';

@Directive({
  selector: '[appSlideOutOutlet]'
})
export class SlideOutOutletDirective {

  constructor(
    public readonly viewContainerRef: ViewContainerRef
  ) {
  }
}
