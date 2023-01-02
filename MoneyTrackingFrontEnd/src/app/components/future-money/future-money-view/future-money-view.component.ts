import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const moment = _moment;

@Component({
  selector: 'app-future-money-view',
  templateUrl: './future-money-view.component.html',
  styleUrls: ['./future-money-view.component.scss'],
})
export class FutureMoneyViewComponent implements OnInit {
  futureMoneyForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;
  status: boolean = true;
  answer: number = 0;

  constructor(
    private futureMoneyService: FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FutureMoneyViewComponent>,
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
      this.dialogTitle = 'Elden Gelecek Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(
        this.data.row.futureMoneyRegistrationDate,
        Validators.required
      );
      this.dateInput = this.data.row.futureMoneyRegistrationDate;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Elden Gelecek Güncelle';
      this.answer=this.data.row.futureAmount;
    }
    this.getForms();
  }

  getForms() {
    this.createFutureMoneyForm();
    if (!this.data.status) {
      this.editFutureMoneyForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.futureMoneyForm.controls['futureMoneyRegistrationDate'].setValue(this.dateInput);
  }

  createFutureMoneyForm() {
    if (this.data.status) {
      this.futureMoneyForm = this.formBuilder.group({
        userId: [this.data.userId],
        typeOfOperation: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        amountPaid: ['', Validators.required],
        futureAmount: [''],
        futureMoneyRegistrationDate: [this.dateInput, Validators.required],
        description: [''],
        status: [this.status],
      });
    } else if (!this.data.status) {
      this.futureMoneyForm = this.formBuilder.group({
        futureMoneyId: [this.data.row.futureMoneyId],
        userId: [this.data.row.userId],
        typeOfOperation: ['', Validators.required],
        customerCode: ['', Validators.required],
        customerNameSurname: ['', Validators.required],
        promissoryNumber: ['', Validators.required],
        transactionAmount: ['', Validators.required],
        amountPaid: ['', Validators.required],
        futureAmount: [''],
        futureMoneyRegistrationDate: [this.dateInput, Validators.required],
        description: [''],
        status: [this.data.row.status],
      });
    }
  }

  editFutureMoneyForm() {
    this.futureMoneyForm.controls['typeOfOperation'].setValue(
      this.data.row.typeOfOperation
    );
    this.futureMoneyForm.controls['customerCode'].setValue(
      this.data.row.customerCode
    );
    this.futureMoneyForm.controls['customerNameSurname'].setValue(
      this.data.row.customerNameSurname
    );
    this.futureMoneyForm.controls['promissoryNumber'].setValue(
      this.data.row.promissoryNumber
    );
    this.futureMoneyForm.controls['transactionAmount'].setValue(
      this.data.row.transactionAmount
    );
    this.futureMoneyForm.controls['amountPaid'].setValue(
      this.data.row.amountPaid
    );
    this.futureMoneyForm.controls['futureAmount'].setValue(
      this.data.row.futureAmount
    );
    this.futureMoneyForm.controls['description'].setValue(
      this.data.row.description
    );
  }

  control() {
    let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
    if (futureMoneyModel.transactionAmount == futureMoneyModel.amountPaid) {
      this.toastrService.error(
        'İşlem Tutarı İle Ödenen Tutar Aynı Olamaz ',
        'Dikkat'
      );
    } else if (
      futureMoneyModel.transactionAmount < futureMoneyModel.amountPaid
    ) {
      this.toastrService.error(
        'Ödenen Tutar İşlem Tutarından Büyük Olamaz ',
        'Dikkat'
      );
    } else {
      this.answer =
        futureMoneyModel.transactionAmount - futureMoneyModel.amountPaid;
      this.futureMoneyForm.controls['futureAmount'].setValue(this.answer);
      this.statusControl();
    }
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    debugger
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.add(futureMoneyModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.futureMoneyForm.reset();
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
      this.toastrService.error(
        'Lütfen Tüm Zorunlu Alanları Doldurun',
        'Dikkat'
      );
    }
  }

  update() {
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.futureMoneyForm.reset();
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
      this.toastrService.error('Lütfen Tüm Zorunlu Alanları Doldurun', 'Dikkat');
    }
  }
}
