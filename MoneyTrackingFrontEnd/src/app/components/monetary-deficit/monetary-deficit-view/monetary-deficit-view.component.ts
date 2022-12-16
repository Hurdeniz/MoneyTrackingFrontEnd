import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MonetaryDeficitService } from 'src/app/services/monetary-deficit.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-monetary-deficit-view',
  templateUrl: './monetary-deficit-view.component.html',
  styleUrls: ['./monetary-deficit-view.component.scss']
})
export class MonetaryDeficitViewComponent implements OnInit {
  monetaryDeficitForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;
  status : Boolean=true;

  constructor(
    private monetaryDeficitService: MonetaryDeficitService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MonetaryDeficitViewComponent>,
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
      this.dialogTitle = 'Kasa Açığı Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Kasa Açığı Güncelle';
    }
    this.getForms();
  }

  getForms() {
    this.createMonetaryDeficitForm();
    if (!this.data.status) {
      this.editMonetaryDeficitForm();
    }
  }

  addEvent(event: any) {
    let a: Moment = event.value;
    this.dateInput = a.format('YYYY-MM-DD');
    this.monetaryDeficitForm.controls['date'].setValue(this.dateInput);
  }

  createMonetaryDeficitForm() {
    if (this.data.status) {
      this.monetaryDeficitForm = this.formBuilder.group({
        nameSurname: ['', Validators.required],
        amount: ['', Validators.required],
        date:[this.dateInput,Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.monetaryDeficitForm = this.formBuilder.group({
        monetaryDeficitId: [this.data.row.monetaryDeficitId],
        nameSurname: ['', Validators.required],
        amount: ['', Validators.required],
        date: [this.dateInput,Validators.required],
        description: [''],
      });
    }
  }

  editMonetaryDeficitForm() {
    this.monetaryDeficitForm.controls['nameSurname'].setValue(this.data.row.nameSurname);
    this.monetaryDeficitForm.controls['amount'].setValue(this.data.row.amount);
    this.monetaryDeficitForm.controls['description'].setValue(this.data.row.description);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
      if (this.monetaryDeficitForm.valid) {
        let monetaryDeficitModel = Object.assign({}, this.monetaryDeficitForm.value);
        this.monetaryDeficitService.add(monetaryDeficitModel).subscribe(
          (response) => {

            this.toastrService.success(response.message, 'Başarılı');
            this.monetaryDeficitForm.reset();
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
    if (this.monetaryDeficitForm.valid) {
      let monetaryDeficitModel = Object.assign({}, this.monetaryDeficitForm.value);
      this.monetaryDeficitService.update(monetaryDeficitModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.monetaryDeficitForm.reset();
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
