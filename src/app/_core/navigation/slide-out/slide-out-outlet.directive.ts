import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adminSlideOutOutlet]'
})
export class SlideOutOutletDirective {

  constructor(
    public readonly viewContainerRef: ViewContainerRef
  ) {
  }
}
