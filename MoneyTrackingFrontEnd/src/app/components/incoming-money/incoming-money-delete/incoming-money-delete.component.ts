import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';

@Component({
  selector: 'app-incoming-money-delete',
  templateUrl: './incoming-money-delete.component.html',
  styleUrls: ['./incoming-money-delete.component.scss']
})
export class IncomingMoneyDeleteComponent implements OnInit {
  incomingMoneyForm: FormGroup;
  futureMoneyForm: FormGroup;
  futureMoneyStatus: boolean = true;
  customerNameSurname: string;
  incomingAmount: number;
  answerAmountPaid: number;
  answerFutureAmount: number;



  constructor(
    private incomingMoneyService: IncomingMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<IncomingMoneyDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.customerNameSurname = this.deleteData.customerNameSurname;
    this.incomingAmount = this.deleteData.incomingAmount;
    this.createIncomingMoneyForm();
  }

  createIncomingMoneyForm() {
    this.incomingMoneyForm = this.formBuilder.group({
      incomingMoneyId: [this.deleteData.incomingMoneyId],
      futureMoneyId: [this.deleteData.futureMoneyId],
      incomingAmount: [this.deleteData.incomingAmount],
      incomingMoneyRegistrationDate: [this.deleteData.incomingMoneyRegistrationDate],
      inComingMoneyDescription: [this.deleteData.inComingMoneyDescription],
      incomingMoneyStatus: [this.deleteData.incomingMoneyStatus],
      userId: [this.deleteData.userId],
      typeOfOperation: [this.deleteData.typeOfOperation],
      customerCode: [this.deleteData.customerCode],
      customerNameSurname: [this.deleteData.customerNameSurname],
      promissoryNumber: [this.deleteData.promissoryNumber],
      transactionAmount: [this.deleteData.transactionAmount],
      amountPaid: [this.deleteData.amountPaid],
      futureAmount: [this.deleteData.futureAmount],
      futureMoneyRegistrationDate: [this.deleteData.futureMoneyRegistrationDate],
      futureMoneyDescription: [this.deleteData.futureMoneyDescription],
      futureMoneyStatus: [this.futureMoneyStatus],
    });
  }


  delete() {
    if (this.deleteData.incomingMoneyStatus == false) {
      this.answerAmountPaid = this.deleteData.amountPaid - this.deleteData.incomingAmount;
      this.answerFutureAmount = this.deleteData.incomingAmount + this.deleteData.futureAmount;
      this.incomingMoneyForm.controls['amountPaid'].setValue(this.answerAmountPaid);
      this.incomingMoneyForm.controls['futureAmount'].setValue(this.answerFutureAmount);
    }
    if (this.incomingMoneyForm.valid) {
      let incomingMoneyModel = Object.assign({}, this.incomingMoneyForm.value);
      this.incomingMoneyService
        .delete(incomingMoneyModel)
        .subscribe((response) => {
          this.toastrService.success('Gelen Ödeme Silinmiştir', 'Başarılı');
          this.incomingMoneyForm.reset();

          this.dialogRef.close('delete');
        }, (responseError) => {
          console.log(responseError)
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
