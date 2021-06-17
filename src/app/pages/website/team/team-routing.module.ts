import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberNewComponent } from './team-member/team-member-new.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TeamComponentComponent } from './team-component.component';
import { TeamDepartmentComponent } from './team-department/team-department.component';
import { TeamDepartmentNewComponent } from './team-department-new/team-department-new.component';

const routes: Routes = [{
  path: '', component: TeamComponentComponent,
  children: [
    { path: 'new', component: TeamMemberNewComponent },
    { path: ':memberId', component: TeamMemberComponent },
    { path: 'department/new', component: TeamDepartmentNewComponent },
    { path: 'department/:departmentId', component: TeamDepartmentComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
