import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appSlideOutOutlet]'
})
export class SlideOutOutletDirective {

  constructor(
    public readonly viewContainerRef: ViewContainerRef
  ) {
  }
}
