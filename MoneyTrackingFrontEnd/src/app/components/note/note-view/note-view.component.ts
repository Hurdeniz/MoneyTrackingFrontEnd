import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {
  noteForm: FormGroup;
  actionBtnName = 'Kaydet';
  dialogTitle = 'Not Ekle';

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<NoteViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createNoteForm();
    if (this.editData) {
      this.editNoteForm();
    }
  }


  createNoteForm() {
    if (!this.editData) {
      this.noteForm = this.formBuilder.group({
        userId:['1'],
        date:['',Validators.required],
        description: [''],
      });
    } else {
      this.noteForm = this.formBuilder.group({
        noteId: [this.editData.noteId],
        userId: [this.editData.userId],
        date: ['',Validators.required],
        description: [''],
      });
    }
  }

  editNoteForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Not Güncelle';
    this.noteForm.controls['date'].setValue(this.editData.date);
    this.noteForm.controls['description'].setValue(this.editData.description);
  }

  add() {

    if (!this.editData) {
      if (this.noteForm.valid) {
        let noteModel = Object.assign({}, this.noteForm.value);
        this.noteService.add(noteModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.noteForm.reset();
            this.dialogRef.close('save');
          },
          (responseError) => {
            if (responseError.error.ValidationErrors.length > 0) {
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      } else {
        this.toastrService.error('Formunuz Eksik', 'Dikkat');
      }
    } else {
      this.update();
    }
  }

  update() {
    if (this.noteForm.valid) {
      let noteModel = Object.assign({}, this.noteForm.value);
      this.noteService.update(noteModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.noteForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }


}
