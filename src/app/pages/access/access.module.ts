import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { PageModule } from '../../_core/page/page.module';
import { ControlsModule } from '../../_core/controls/controls.module';
import { IconsModule } from '../../_core/icons/icons.module';


@NgModule({
  declarations: [ AccessComponent ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    PageModule,
    ControlsModule,
    IconsModule
  ]
})
export class AccessModule {
}
