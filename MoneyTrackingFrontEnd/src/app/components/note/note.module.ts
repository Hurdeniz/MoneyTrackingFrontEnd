import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NoteComponent, NoteViewComponent, NoteDeleteComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class NoteModule {}
