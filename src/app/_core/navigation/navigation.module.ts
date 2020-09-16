import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation.component';
import { LogoComponent } from './logo/logo.component';
import { ControlsModule } from '../controls/controls.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NavigationComponent,
    LogoComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule
  ]
})
export class NavigationModule {
}
