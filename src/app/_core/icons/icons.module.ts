import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { LogoutComponent } from './logout/logout.component';
import { AddComponent } from './add/add.component';
import { SaveComponent } from './save/save.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    TeamComponent,
    LogoutComponent,
    AddComponent,
    SaveComponent,
    LogoComponent
  ],
    exports: [
        LogoutComponent,
        TeamComponent,
        AddComponent,
        SaveComponent,
        LogoComponent
    ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
