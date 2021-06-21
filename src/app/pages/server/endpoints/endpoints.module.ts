import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndpointsRoutingModule } from './endpoints-routing.module';
import { EndpointsComponent } from './endpoints.component';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [
    EndpointsComponent
  ],
  imports: [
    CommonModule,
    EndpointsRoutingModule,
    CdkTableModule
  ]
})
export class EndpointsModule {
}
