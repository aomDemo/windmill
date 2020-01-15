import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TaskDetailsDialogComponent } from './task-details-dialog/task-details-dialog.component';

@NgModule({
  declarations: [DashboardComponent, TaskDetailsDialogComponent],
  imports: [CommonModule, RouterModule, SharedModule, DashboardRoutingModule],
  entryComponents: [TaskDetailsDialogComponent]
})
export class DashboardModule {}
