import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './_core/account/account.guard';
import { LoginGuard } from './_core/account/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
    canActivate: [ AccountGuard ]
  },
  {
    path: 'dashboard',
    canActivate: [ AccountGuard ],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'account',
    canActivate: [ AccountGuard ],
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'team',
    canActivate: [ AccountGuard ],
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'login',
    canActivate: [ LoginGuard ],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'access',
    canActivate: [ AccountGuard ],
    loadChildren: () => import('./pages/access/access.module').then(m => m.AccessModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
