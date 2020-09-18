import { Component, ComponentFactoryResolver, Injector, Input, OnChanges, SimpleChanges, Type, ViewChild } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { SlideoutOutletDirective } from './slideout-outlet.directive';

@Component({
  selector: 'admin-slideout',
  templateUrl: './slideout.component.html',
  styleUrls: [ './slideout.component.scss' ]
})
export class SlideoutComponent implements OnChanges {

  @Input()
  private slideout: Type<unknown>;

  @ViewChild(SlideoutOutletDirective, { static: true })
  private outlet: SlideoutOutletDirective;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly injector: Injector
  ) {
  }

  private loadComponent(component: Type<unknown>): void {
    this.outlet.viewContainerRef.clear();
    if (component) {
      this.outlet.viewContainerRef.createComponent(this.componentFactory.resolveComponentFactory(component));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadComponent(this.slideout);
  }
}
