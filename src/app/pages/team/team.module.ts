import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { ControlsModule } from '../../_core/controls/controls.module';
import { PageModule } from '../../_core/page/page.module';
import { IconsModule } from '../../_core/icons/icons.module';
import { TeamSlideoutAddMemberComponent } from './team-slideout-add-member/team-slideout-add-member.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ TeamComponent, TeamMemberComponent, TeamSlideoutAddMemberComponent ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ControlsModule,
    PageModule,
    IconsModule,
    ReactiveFormsModule
  ]
})
export class TeamModule {
}
