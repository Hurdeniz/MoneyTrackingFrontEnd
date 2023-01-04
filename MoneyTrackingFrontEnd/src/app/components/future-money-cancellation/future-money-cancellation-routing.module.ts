import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureMoneyCancellationComponent } from './future-money-cancellation.component';

const routes: Routes = [
  {path:'' , component:FutureMoneyCancellationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureMoneyCancellationRoutingModule { }
