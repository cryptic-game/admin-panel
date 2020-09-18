import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  readonly title: Subject<string>;
  readonly visibility: Subject<boolean>;
  readonly slideout: Subject<Type<unknown>>;

  constructor(
    private readonly angularTitle: Title
  ) {
    this.title = new Subject();
    this.visibility = new Subject();
    this.slideout = new Subject();
  }

  public setTitle(title: string): void {
    this.angularTitle.setTitle(`${title} | Admin Panel`);
    this.title.next(title);
  }

  public updateVisibility(value: boolean): void {
    this.visibility.next(value);
  }

  public showSlideout(slideout: Type<unknown>): void {
    this.slideout.next(slideout);
  }
}
