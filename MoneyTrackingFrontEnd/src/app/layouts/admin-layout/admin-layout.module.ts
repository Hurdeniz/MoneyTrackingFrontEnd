import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';

import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './admin-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
    MatSidenavModule,
    MatIconModule


  ]
})
export class AdminLayoutModule { }
