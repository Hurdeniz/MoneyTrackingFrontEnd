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
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
const moment = _moment;
@Component({
  selector: 'app-partial-incoming-money',
  templateUrl: './partial-incoming-money.component.html',
  styleUrls: ['./partial-incoming-money.component.scss'],
})
export class PartialIncomingMoneyComponent implements OnInit {
  incomingMoneyForm: FormGroup;
  futureMoneyForm: FormGroup;
  futureMoneyStatus: boolean = false;
  futureMoneyId: string;
  futureAmount: number;
  typeOfOperation: string;
  customerCode: string;
  customerNameSurname: string;
  promissoryNumber: string;
  amountPaid: number;
  dateNow: FormControl;
  dateInput: any;
  answer: number;

  constructor(
    private incomingMoneyService: IncomingMoneyService,
    private futureMoneyService: FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PartialIncomingMoneyComponent>,
    private toastrService: ToastrService
  ) {}

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
    this.updateFutureMoneyForm();
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
      description: [''],
    });
  }

  updateFutureMoneyForm() {
    this.futureMoneyForm = this.formBuilder.group({
      futureMoneyId: [this.data.futureMoneyId],
      userId: [this.data.userId],
      typeOfOperation: [this.data.typeOfOperation],
      customerCode: [this.data.customerCode],
      customerNameSurname: [this.data.customerNameSurname],
      promissoryNumber: [this.data.promissoryNumber],
      transactionAmount: [this.data.transactionAmount],
      amountPaid: [this.amountPaid],
      futureAmount: [this.futureAmount],
      futureMoneyRegistrationDate: [this.data.futureMoneyRegistrationDate],
      description: [this.data.description],
      status: [this.data.status],
    });
  }

  control() {
    let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
    let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
    if (futureMoneyModel.futureAmount < incomingMoneyModel.incomingAmount) {
      this.toastrService.error(
        'Gelen Tutar Gelecek Tutardan Büyük Olamaz',
        'Dikkat'
      );
    } else if (
      futureMoneyModel.futureAmount == incomingMoneyModel.incomingAmount
    ) {
      this.toastrService.error(
        'Ödemenin Tamamını Kapatmak İçin Lütfen Ödeme Kapat Butonunu Kullanın Sadece Kısmi Ödemeleri Buradan Yapabilsiniz.',
        'Dikkat'
      );
    } else {
      this.answer = this.data.futureAmount - incomingMoneyModel.incomingAmount;
      this.amountPaid =
        this.data.amountPaid + incomingMoneyModel.incomingAmount;
      this.futureAmount = this.answer;
       this.updateFutureMoneyForm();
       this.add();
    }
  }

  add() {
    if (this.incomingMoneyForm.valid) {
      let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
      this.incomingMoneyService
        .add(incomingMoneyModel)
        .subscribe((response) => {
          this.update();
        });
    }
  }

  update() {
    debugger;
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe((response) => {
        this.toastrService.success('Kısmi Ödeme Alınmıştır.', 'Başarılı');
        this.incomingMoneyForm.reset();
        this.futureMoneyForm.reset();
        this.dialogRef.close('partialincoming');
      });
    }
  }
}
