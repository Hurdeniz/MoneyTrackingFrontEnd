import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-incoming-money',
  templateUrl: './incoming-money.component.html',
  styleUrls: ['./incoming-money.component.scss'],
})
export class IncomingMoneyComponent implements OnInit {
  incomingMoneyForm: FormGroup;
  futureMoneyForm: FormGroup;
  futureMoneyStatus: boolean = false;
  dateNow: FormControl;
  dateInput: any;
  answer: number = 0;

  constructor(
    private incomingMoneyService: IncomingMoneyService,
    private futureMoneyService: FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IncomingMoneyComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
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
      incomingAmount: [this.data.futureAmount],
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
      amountPaid: [this.answer],
      futureAmount: [this.data.futureAmount],
      futureMoneyRegistrationDate: [this.data.futureMoneyRegistrationDate],
      description: [this.data.description],
      status: [this.futureMoneyStatus],
    });
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
    this.answer=this.data.amountPaid+this.data.futureAmount;
    this.updateFutureMoneyForm();
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe((response) => {
        this.toastrService.success(
          'Elden Gelecek Ödemesi Tamamlanmıştır.',
          'Başarılı'
        );
        this.incomingMoneyForm.reset();
        this.futureMoneyForm.reset();
        this.dialogRef.close('incoming');
      });
    }
  }

}
