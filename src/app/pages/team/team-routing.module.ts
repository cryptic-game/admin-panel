import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TeamComponent} from './team.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'all'},
  {path: ':departmentId', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule {
}
