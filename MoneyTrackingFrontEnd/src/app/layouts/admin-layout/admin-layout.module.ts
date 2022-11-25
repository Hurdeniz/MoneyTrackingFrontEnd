import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedModule } from 'src/app/components/shared/shared.module';





@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AdminLayoutModule { }
