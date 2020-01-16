import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '@apiomat/ngx-aom-authentication';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // TODO: uncomment to check if user can go to this page
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
