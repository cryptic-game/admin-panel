import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SlideOutDelegate } from './slide-out/slide-out-delegate';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  readonly title: Subject<string>;
  readonly visibility: Subject<boolean>;
  readonly slideOut: Subject<Type<SlideOutDelegate>>;

  constructor(
    private readonly angularTitle: Title
  ) {
    this.title = new Subject();
    this.visibility = new Subject();
    this.slideOut = new Subject();
  }

  public init(title: string, hideNavigation?: boolean): void {
    this.angularTitle.setTitle(`${title} | Admin Panel`);
    this.title.next(title);
    this.visibility.next(!hideNavigation);
  }

  public showSlideOut(slideOut: Type<SlideOutDelegate>): void {
    this.slideOut.next(slideOut);
  }
}
