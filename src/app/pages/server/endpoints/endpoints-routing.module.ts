import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndpointsComponent } from './endpoints.component';

const routes: Routes = [{ path: '', component: EndpointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointsRoutingModule {
}
