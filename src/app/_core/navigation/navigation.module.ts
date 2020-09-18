import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation.component';
import { LogoComponent } from './logo/logo.component';
import { ControlsModule } from '../controls/controls.module';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { SlideoutComponent } from './slideout/slideout.component';
import { SlideoutOutletDirective } from './slideout/slideout-outlet.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NavigationComponent,
    LogoComponent,
    SlideoutComponent,
    SlideoutOutletDirective
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule,
    IconsModule
  ]
})
export class NavigationModule {
}
