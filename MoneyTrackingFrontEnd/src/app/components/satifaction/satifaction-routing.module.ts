import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SatifactionComponent } from './satifaction.component';

const routes: Routes = [
  {path:'',component:SatifactionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SatifactionRoutingModule { }
