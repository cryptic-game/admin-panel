import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconDirective } from './icon/icon.directive';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  declarations: [ ButtonComponent, IconDirective, RadioComponent ],
    exports: [
        ButtonComponent,
        IconDirective,
        RadioComponent
    ],
  imports: [
    CommonModule
  ]
})
export class ControlsModule {
}
