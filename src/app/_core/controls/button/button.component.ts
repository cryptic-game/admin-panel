import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'control-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ]
})
export class ButtonComponent {

  @Input()
  @HostBinding('class.disabled')
  private disabled = false;

  @Input()
  @HostBinding('className')
  private type: 'default' | 'green' | 'yellow' | 'red' = 'default';
}
