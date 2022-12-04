import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputService } from 'src/app/services/money-output.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-money-output-view',
  templateUrl: './money-output-view.component.html',
  styleUrls: ['./money-output-view.component.scss'],
})
export class MoneyOutputViewComponent implements OnInit {
  dateNow: FormControl;
  moneyOutputForm: FormGroup;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private moneyOutputService: MoneyOutputService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoneyOutputViewComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Kasa Çıkış Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.date, Validators.required);
      this.dateInput = this.data.row.date;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Kasa Çıkış Güncelle';
    }
    this.getForms();
  }

  getForms() {
    this.createMoneyOutputForm();
    if (!this.data.status) {
      this.editMoneyOutputForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.moneyOutputForm.controls['date'].setValue(this.dateInput);
  }

  createMoneyOutputForm() {
    if (this.data.status) {
      this.moneyOutputForm = this.formBuilder.group({
        userId: [this.data.userId],
        totalAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    } else if (!this.data.status) {
      this.moneyOutputForm = this.formBuilder.group({
        moneyOutputId: [this.data.row.moneyOutputId],
        userId: [this.data.row.userId],
        totalAmount: ['', Validators.required],
        date: [this.dateInput, Validators.required],
        description: [''],
      });
    }
  }

  editMoneyOutputForm() {
    this.moneyOutputForm.controls['totalAmount'].setValue(
      this.data.row.totalAmount
    );
    this.moneyOutputForm.controls['description'].setValue(
      this.data.row.description
    );
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    if (this.moneyOutputForm.valid) {
      let moneyOutputModel = Object.assign({}, this.moneyOutputForm.value);
      this.moneyOutputService.add(moneyOutputModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.moneyOutputForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
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
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  update() {
    if (this.moneyOutputForm.valid) {
      let moneyOutputModel = Object.assign({}, this.moneyOutputForm.value);
      this.moneyOutputService.update(moneyOutputModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.moneyOutputForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
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
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
