import {Component, ComponentFactoryResolver, Input, OnChanges, SimpleChanges, Type, ViewChild} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {SlideOutOutletDirective} from './slide-out-outlet.directive';
import {SlideOutDelegate} from './slide-out-delegate';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss']
})
export class SlideOutComponent implements OnChanges {

  @ViewChild(SlideOutOutletDirective, {static: true})
  public title?: string;
  @Input()
  public slideOut?: Type<SlideOutDelegate>;
  private outlet?: SlideOutOutletDirective;
  private currentSubscription?: Subscription;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly componentFactory: ComponentFactoryResolver
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slideOut) {
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }

      if (this.slideOut) {
        this.loadComponent(this.slideOut);
      } else {
        this.close();
      }
    }
  }

  close(): void {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    this.navigationService.showSlideOut(undefined);
  }

  private loadComponent(component: Type<SlideOutDelegate>): void {
    if (component && this.outlet) {
      const instance = this.outlet.viewContainerRef.createComponent(this.componentFactory.resolveComponentFactory(component)).instance;
      this.title = instance.title;
      this.currentSubscription = instance.close0.subscribe(() => {
        if (this.currentSubscription) {
          this.currentSubscription.unsubscribe();
        }
        this.close();
      });
    }
  }
}
