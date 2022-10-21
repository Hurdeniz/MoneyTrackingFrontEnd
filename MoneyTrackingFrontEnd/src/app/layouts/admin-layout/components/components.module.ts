import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,

  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports:[
    ToolbarComponent,
    SidenavComponent
  ]


})
export class ComponentsModule { }
