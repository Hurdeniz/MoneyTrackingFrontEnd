import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResearchListRoutingModule } from './research-list-routing.module';
import { ResearchListComponent } from './research-list.component';
import { ResearchListDeleteComponent } from './research-list-delete/research-list-delete.component';
import { ResearchListViewComponent } from './research-list-view/research-list-view.component';
import { ResearchListFilterComponent } from './research-list-filter/research-list-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ResearchListComponent,
    ResearchListDeleteComponent,
    ResearchListViewComponent,
    ResearchListFilterComponent,
  ],
  imports: [
    CommonModule,
    ResearchListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ResearchListModule {}
