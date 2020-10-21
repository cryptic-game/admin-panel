import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { LogoutComponent } from './logout/logout.component';
import { AddComponent } from './add/add.component';
import { SaveComponent } from './save/save.component';
import { LogoComponent } from './logo/logo.component';
import { CloseComponent } from './close/close.component';
import { AccessComponent } from './users/access.component';
import { RemoveComponent } from './remove/remove.component';
import { EditComponent } from './edit/edit.component';
import { ArrowLeftComponent } from './arrow-left/arrow-left.component';
import { ArrowRightComponent } from './arrow-right/arrow-right.component';

@NgModule({
  declarations: [
    TeamComponent,
    LogoutComponent,
    AddComponent,
    SaveComponent,
    LogoComponent,
    CloseComponent,
    AccessComponent,
    RemoveComponent,
    EditComponent,
    ArrowLeftComponent,
    ArrowRightComponent
  ],
  exports: [
    LogoutComponent,
    TeamComponent,
    AddComponent,
    SaveComponent,
    LogoComponent,
    CloseComponent,
    AccessComponent,
    RemoveComponent,
    EditComponent,
    ArrowLeftComponent,
    ArrowRightComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
