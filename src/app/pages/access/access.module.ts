import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { PageModule } from '../../_core/page/page.module';
import { ControlsModule } from '../../_core/controls/controls.module';
import { IconsModule } from '../../_core/icons/icons.module';
import { AccessSlideOutAddUserComponent } from './access-slide-out-add-user/access-slide-out-add-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ AccessComponent, AccessSlideOutAddUserComponent ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    PageModule,
    ControlsModule,
    IconsModule,
    ReactiveFormsModule
  ]
})
export class AccessModule {
}
