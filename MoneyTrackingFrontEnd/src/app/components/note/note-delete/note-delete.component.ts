import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss']
})
export class NoteDeleteComponent implements OnInit {
  constructor(
    private noteService: NoteService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<NoteDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

  }

  delete() {
    this.noteService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
