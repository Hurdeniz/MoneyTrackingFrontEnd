import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CentralPayRoutingModule } from './central-pay-routing.module';
import { CentralPayComponent } from './central-pay.component';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CentralPayFilterComponent } from './central-pay-filter/central-pay-filter.component';





@NgModule({
  declarations: [CentralPayComponent, CentralPayViewComponent, CentralPayDeleteComponent, CentralPayFilterComponent],
  imports: [
    CommonModule,
    CentralPayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatDatepickerModule
  ],
})
export class CentralPayModule {}
