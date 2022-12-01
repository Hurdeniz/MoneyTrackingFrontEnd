import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffTaskRoutingModule } from './staff-task-routing.module';
import { StaffTaskComponent } from './staff-task.component';
import { StaffTaskViewComponent } from './staff-task-view/staff-task-view.component';
import { StaffTaskDeleteComponent } from './staff-task-delete/staff-task-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StaffTaskComponent,
    StaffTaskViewComponent,
    StaffTaskDeleteComponent,
  ],
  imports: [
    CommonModule,
    StaffTaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class StaffTaskModule {}
