import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosizeDirective } from './autosize/autosize.directive';

@NgModule({
  declarations: [
    AutosizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutosizeDirective
  ]
})
export class SharedModule {
}
