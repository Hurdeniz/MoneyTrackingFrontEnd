import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonetaryDeficitComponent } from './monetary-deficit.component';

const routes: Routes = [
  {path:'' , component:MonetaryDeficitComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonetaryDeficitRoutingModule { }
