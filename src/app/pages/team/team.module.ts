import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { ControlsModule } from '../../_core/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ TeamComponent, TeamMemberComponent ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ControlsModule,
    ReactiveFormsModule
  ]
})
export class TeamModule {
}
