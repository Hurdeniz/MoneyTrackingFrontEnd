import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentralPayComponent } from './central-pay.component';

const routes: Routes = [
  {path:'' , component:CentralPayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralPayRoutingModule { }
