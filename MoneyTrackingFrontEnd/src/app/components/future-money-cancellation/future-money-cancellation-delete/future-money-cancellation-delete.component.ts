import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyCancellationService } from 'src/app/services/future-money-cancellation.service';

@Component({
  selector: 'app-future-money-cancellation-delete',
  templateUrl: './future-money-cancellation-delete.component.html',
  styleUrls: ['./future-money-cancellation-delete.component.scss']
})
export class FutureMoneyCancellationDeleteComponent {
  futureMoneyCancellationForm: FormGroup;
  futureMoneyForm: FormGroup;
  futureMoneyStatus: boolean = true;
  customerNameSurname: string;
  futureMoneyCancellationAmount: number;

  constructor(
    private futureMoneyCancellationService: FutureMoneyCancellationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<FutureMoneyCancellationDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.deleteData)
    this.customerNameSurname = this.deleteData.customerNameSurname;
    this.futureMoneyCancellationAmount = this.deleteData.futureMoneyCancellationAmount;
    this.createIncomingMoneyForm();
  }

  createIncomingMoneyForm() {
    this.futureMoneyCancellationForm = this.formBuilder.group({
      futureMoneyCancellationId: [this.deleteData.futureMoneyCancellationId],
      futureMoneyId: [this.deleteData.futureMoneyId],
      futureMoneyCancellationAmount: [this.deleteData.futureMoneyCancellationAmount],
      futureMoneyCancellationRegistrationDate: [this.deleteData.futureMoneyCancellationRegistrationDate],
      futureMoneyCancellationDescription: [this.deleteData.futureMoneyCancellationDescription],
      userId: [this.deleteData.userId],
      typeOfOperation: [this.deleteData.typeOfOperation],
      customerCode: [this.deleteData.customerCode],
      customerNameSurname: [this.deleteData.customerNameSurname],
      promissoryNumber: [this.deleteData.promissoryNumber],
      transactionAmount: [this.deleteData.transactionAmount],
      amountPaid: [this.deleteData.amountPaid],
      futureAmount: [this.deleteData.futureMoneyCancellationAmount],
      futureMoneyRegistrationDate: [this.deleteData.futureMoneyRegistrationDate],
      futureMoneyDescription: [this.deleteData.futureMoneyDescription],
      futureMoneyStatus: [this.futureMoneyStatus],
    });
  }

  delete() {

    if (this.futureMoneyCancellationForm.valid) {
      let futureMoneyCancellationModel = Object.assign({}, this.futureMoneyCancellationForm.value);
      this.futureMoneyCancellationService
        .delete(futureMoneyCancellationModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.futureMoneyCancellationForm.reset();
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
