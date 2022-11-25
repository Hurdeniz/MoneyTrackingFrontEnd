import { NgModule ,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from 'src/app/components/shared/shared.module';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule

  ],
  exports:[
    ToolbarComponent,
    SidenavComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ComponentsModule { }
