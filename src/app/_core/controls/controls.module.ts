import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconDirective } from './icon/icon.directive';
import { RadioComponent } from './radio/radio.component';
import { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  declarations: [ ButtonComponent, IconDirective, RadioComponent, TextFieldComponent ],
  exports: [
    ButtonComponent,
    IconDirective,
    RadioComponent,
    TextFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ControlsModule {
}
