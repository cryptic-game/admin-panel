import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    TeamComponent,
    LogoutComponent
  ],
  exports: [
    LogoutComponent,
    TeamComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
