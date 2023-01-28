import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  futureMoneyStatus: boolean=false;
  incominMoneyStatus:boolean=true;
  dateNow: FormControl;
  dateInput: any;
  answer: number = 0;

  constructor(
    private incomingMoneyService: IncomingMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IncomingMoneyComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
    this.createIncomingMoneyForm();
    console.log(this.data);
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
      inComingMoneyDescription: [''],
      incomingMoneyStatus:[this.incominMoneyStatus],
      userId: [this.data.userId],
      typeOfOperation: [this.data.typeOfOperation],
      customerCode: [this.data.customerCode],
      customerNameSurname: [this.data.customerNameSurname],
      promissoryNumber: [this.data.promissoryNumber],
      transactionAmount: [this.data.transactionAmount],
      amountPaid: [this.data.amountPaid],
      futureAmount: [this.data.futureAmount],
      futureMoneyRegistrationDate: [this.data.futureMoneyRegistrationDate],
      futureMoneyDescription: [this.data.description],
      futureMoneyStatus: [this.futureMoneyStatus],
    });
  }

  add() {
    if (this.incomingMoneyForm.valid) {
      let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
      this.incomingMoneyService
        .add(incomingMoneyModel)
        .subscribe((response) => {
          this.toastrService.success(
            response.message, 'Başarılı');
          this.incomingMoneyForm.reset();
          this.dialogRef.close('incoming');
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
          });
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }



}
