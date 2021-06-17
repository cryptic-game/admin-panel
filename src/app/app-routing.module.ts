import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'website', loadChildren: () => import('./pages/website/website.module').then(m => m.WebsiteModule) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'server', loadChildren: () => import('./pages/server/server.module').then(m => m.ServerModule) },
  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
