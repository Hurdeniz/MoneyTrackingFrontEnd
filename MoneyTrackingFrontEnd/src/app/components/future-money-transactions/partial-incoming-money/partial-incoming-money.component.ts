import { Component, Inject, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as _moment from 'moment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const moment = _moment;
@Component({
  selector: 'app-partial-incoming-money',
  templateUrl: './partial-incoming-money.component.html',
  styleUrls: ['./partial-incoming-money.component.scss'],
})
export class PartialIncomingMoneyComponent implements OnInit {
  incomingMoneyForm: FormGroup;
  incomingMoneyStatus: boolean = false;
  futureMoneyId: string;
  futureAmount: number;
  typeOfOperation: string;
  customerCode: string;
  customerNameSurname: string;
  promissoryNumber: string;
  amountPaid: number;
  dateNow: FormControl;
  dateInput: any;

  constructor(
    private incomingMoneyService: IncomingMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PartialIncomingMoneyComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.futureMoneyId = this.data.futureMoneyId;
    this.futureAmount = this.data.futureAmount;
    this.typeOfOperation = this.data.typeOfOperation;
    this.customerCode = this.data.customerCode;
    this.customerNameSurname = this.data.customerNameSurname;
    this.promissoryNumber = this.data.promissoryNumber;
    this.amountPaid = this.data.amountPaid;

    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
    this.createIncomingMoneyForm();
  }
  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.createIncomingMoneyForm();
  }

  createIncomingMoneyForm() {
    this.incomingMoneyForm = this.formBuilder.group({
      futureMoneyId: [this.data.futureMoneyId],
      incomingAmount: ['', Validators.required],
      incomingMoneyRegistrationDate: [this.dateInput, Validators.required],
      inComingMoneyDescription: [''],
      incomingMoneyStatus: [this.incomingMoneyStatus],
      userId: [this.data.userId],
      typeOfOperation: [this.data.typeOfOperation],
      customerCode: [this.data.customerCode],
      customerNameSurname: [this.data.customerNameSurname],
      promissoryNumber: [this.data.promissoryNumber],
      transactionAmount: [this.data.transactionAmount],
      amountPaid: [this.amountPaid],
      futureAmount: [this.futureAmount],
      futureMoneyRegistrationDate: [this.data.futureMoneyRegistrationDate],
      futureMoneyDescription: [this.data.description],
      futureMoneyStatus: [this.data.status]
    });
  }

  control() {
    let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
    if (this.data.futureAmount < incomingMoneyModel.incomingAmount) {
      this.toastrService.error(
        'Gelen Tutar Gelecek Tutardan Büyük Olamaz',
        'Dikkat'
      );
    } else if (this.data.futureAmount == incomingMoneyModel.incomingAmount) {
      this.toastrService.error(
        'Ödemenin Tamamını Kapatmak İçin Lütfen Ödeme Kapat Butonunu Kullanın Sadece Kısmi Ödemeleri Buradan Yapabilirsiniz',
        'Dikkat'
      );
    } else {
      let futureMoneyAnswer =
        this.data.futureAmount - incomingMoneyModel.incomingAmount;
      let amountPaidAnswer =
        this.data.amountPaid + incomingMoneyModel.incomingAmount;
      this.futureAmount = futureMoneyAnswer;
      this.incomingMoneyForm.controls['amountPaid'].setValue(amountPaidAnswer);
      this.incomingMoneyForm.controls['futureAmount'].setValue(
        futureMoneyAnswer
      );
      this.add();
    }
  }

  add() {
    if (this.incomingMoneyForm.valid) {
      let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
      this.incomingMoneyService
        .add(incomingMoneyModel)
        .subscribe((response) => {
          this.toastrService.success('Kısmi Ödeme Alınmıştır.', 'Başarılı');
          this.incomingMoneyForm.reset();
          this.dialogRef.close('partialincoming');
        }, (responseError) => {
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
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
