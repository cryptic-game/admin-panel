import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ControlsModule } from '../../_core/controls/controls.module';
import { IconsModule } from '../../_core/icons/icons.module';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ControlsModule,
    IconsModule
  ]
})
export class LoginModule {
}
