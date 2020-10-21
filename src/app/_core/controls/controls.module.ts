import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconDirective } from './icon/icon.directive';
import { RadioComponent } from './radio/radio.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { PaginationComponent } from './pagination/pagination.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [ ButtonComponent, IconDirective, RadioComponent, TextFieldComponent, PaginationComponent ],
  exports: [
    ButtonComponent,
    IconDirective,
    RadioComponent,
    TextFieldComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class ControlsModule {
}
