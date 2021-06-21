import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamRoutingModule } from './team-routing.module';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { CdkTableModule } from '@angular/cdk/table';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TeamMemberNewComponent } from './team-member/team-member-new.component';
import { TeamComponentComponent } from './team-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamDepartmentComponent } from './team-department/team-department.component';
import { TeamDepartmentNewComponent } from './team-department-new/team-department-new.component';
import { SharedModule } from '../../../core/shared/shared.module';
import { TeamNoActionComponent } from './team-no-action/team-no-action.component';

@NgModule({
  declarations: [
    TeamOverviewComponent,
    TeamMemberComponent,
    TeamMemberNewComponent,
    TeamComponentComponent,
    TeamDepartmentComponent,
    TeamDepartmentNewComponent,
    TeamNoActionComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    CdkTableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TeamModule {
}
