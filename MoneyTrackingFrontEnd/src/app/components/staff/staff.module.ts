import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { StaffDeleteComponent } from './staff-delete/staff-delete.component';
import { StaffRoutingModule } from './staff-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StaffCheckOutComponent } from './staff-check-out/staff-check-out.component';
import { StaffBackspaceComponent } from './staff-backspace/staff-backspace.component';

@NgModule({
  declarations: [StaffComponent, StaffViewComponent, StaffDeleteComponent, StaffCheckOutComponent, StaffBackspaceComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class StaffModule {}
