import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffTaskComponent } from './staff-task.component';

const routes: Routes = [
  {path:'' , component:StaffTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffTaskRoutingModule { }
