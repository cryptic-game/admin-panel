import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adminSlideoutOutlet]'
})
export class SlideoutOutletDirective {

  constructor(
    public readonly viewContainerRef: ViewContainerRef
  ) {
  }
}
