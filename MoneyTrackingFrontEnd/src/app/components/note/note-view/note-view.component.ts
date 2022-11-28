import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {
  noteForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NoteViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Not Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.date,
        Validators.required
      );
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Not Güncelle';
    }

    this.getForms();
  }

  getForms() {
    this.createNoteForm();
    if (!this.data.status) {
      this.editNoteForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.noteForm.controls['date'].setValue(this.dateInput);
  }

  createNoteForm() {
    if (this.data.status) {
      this.noteForm = this.formBuilder.group({
        userId:[this.data.userId],
        date:[this.dateInput,Validators.required],
        description: ['',Validators.required],
      });
    } else if (!this.data.status) {
      this.noteForm = this.formBuilder.group({
        noteId: [this.data.row.noteId],
        userId: [this.data.row.userId],
        date: [this.dateInput,Validators.required],
        description: ['',Validators.required],
      });
    }
  }

  editNoteForm() {
    this.noteForm.controls['description'].setValue(this.data.row.description);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
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
