import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CentralPayRoutingModule } from './central-pay-routing.module';
import { CentralPayComponent } from './central-pay.component';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';

import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
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
