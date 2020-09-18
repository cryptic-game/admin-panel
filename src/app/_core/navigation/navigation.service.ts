import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  visibility: Subject<boolean>;

  constructor() {
    this.visibility = new Subject();
  }

  public updateVisibility(value: boolean): void {
    this.visibility.next(value);
  }
}
