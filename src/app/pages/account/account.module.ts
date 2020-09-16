import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NavigationModule } from '../../_core/navigation/navigation.module';

@NgModule({
  declarations: [ AccountComponent ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NavigationModule
  ]
})
export class AccountModule {
}
