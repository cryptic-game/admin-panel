import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeamRoutingModule} from './team-routing.module';
import {TeamComponent} from './team.component';
import {TeamMemberComponent} from './team-member/team-member.component';
import {ControlsModule} from '../../_core/controls/controls.module';
import {PageModule} from '../../_core/page/page.module';
import {IconsModule} from '../../_core/icons/icons.module';
import {TeamSlideOutAddMemberComponent} from './team-slide-out-add-member/team-slide-out-add-member.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TeamSlideOutEditMemberComponent} from './team-slide-out-edit-member/team-slide-out-edit-member.component';

@NgModule({
  declarations: [TeamComponent, TeamMemberComponent, TeamSlideOutAddMemberComponent, TeamSlideOutEditMemberComponent],
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
