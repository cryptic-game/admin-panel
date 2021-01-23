import {EventEmitter} from '@angular/core';

export abstract class SlideOutDelegate {

  public close0: EventEmitter<void>;

  protected constructor(public readonly title: string) {
    this.close0 = new EventEmitter<void>();
  }

  protected close(): void {
    this.close0.emit();
  }
}
