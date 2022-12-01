import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffEpisodeRoutingModule } from './staff-episode-routing.module';
import { StaffEpisodeComponent } from './staff-episode.component';
import { StaffEpisodeViewComponent } from './staff-episode-view/staff-episode-view.component';
import { StaffEpisodeDeleteComponent } from './staff-episode-delete/staff-episode-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StaffEpisodeComponent,
    StaffEpisodeViewComponent,
    StaffEpisodeDeleteComponent,
  ],
  imports: [
    CommonModule,
    StaffEpisodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class StaffEpisodeModule {}
