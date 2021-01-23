import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'control-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  @HostBinding('class.disabled')
  public disabled = false;

  @Input()
  @HostBinding('className')
  public type: 'default' | 'green' | 'yellow' | 'red' = 'default';

  @Output()
  private performClick: EventEmitter<void>;

  constructor() {
    this.performClick = new EventEmitter<void>();
  }

  @HostListener('click')
  private onClick(): void {
    if (!this.disabled) {
      this.performClick.emit();
    }
  }
}
