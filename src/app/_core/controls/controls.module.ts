import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconDirective } from './icon/icon.directive';

@NgModule({
  declarations: [ ButtonComponent, IconDirective ],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ControlsModule {
}
