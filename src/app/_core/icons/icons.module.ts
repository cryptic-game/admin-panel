import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { LogoutComponent } from './logout/logout.component';
import { AddComponent } from './add/add.component';
import { SaveComponent } from './save/save.component';

@NgModule({
  declarations: [
    TeamComponent,
    LogoutComponent,
    AddComponent,
    SaveComponent
  ],
  exports: [
    LogoutComponent,
    TeamComponent,
    AddComponent,
    SaveComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
