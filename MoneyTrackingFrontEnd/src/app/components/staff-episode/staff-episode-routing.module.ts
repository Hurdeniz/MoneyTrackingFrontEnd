import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffEpisodeComponent } from './staff-episode.component';

const routes: Routes = [
  {path:'', component:StaffEpisodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffEpisodeRoutingModule { }
