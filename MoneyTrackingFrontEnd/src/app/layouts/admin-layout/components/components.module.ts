import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from "@angular/router";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule
  ],
  exports:[
    ToolbarComponent,
    SidenavComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ComponentsModule { }
