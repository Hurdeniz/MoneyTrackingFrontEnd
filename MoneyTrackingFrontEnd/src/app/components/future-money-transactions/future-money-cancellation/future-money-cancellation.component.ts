import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyCancellationService } from 'src/app/services/future-money-cancellation.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-future-money-cancellation',
  templateUrl: './future-money-cancellation.component.html',
  styleUrls: ['./future-money-cancellation.component.scss']
})
export class FutureMoneyCancellationComponent {
  futureMoneyCancellationForm: FormGroup;
  futureMoneyForm: FormGroup;
  futureMoneyStatus: boolean = false;
  dateNow: FormControl;
  dateInput: any;

  constructor(
    private futureMoneyCancellationService: FutureMoneyCancellationService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FutureMoneyCancellationComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
    this.createFutureMoneyCancellationForm();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.createFutureMoneyCancellationForm();
  }

  createFutureMoneyCancellationForm() {
    this.futureMoneyCancellationForm = this.formBuilder.group({
      futureMoneyId: [this.data.futureMoneyId],
      futureMoneyCancellationAmount: [this.data.futureAmount],
      futureMoneyCancellationRegistrationDate: [this.dateInput, Validators.required],
      futureMoneyCancellationDescription: [''],
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
    if (this.futureMoneyCancellationForm.valid) {
      let futureMoneyCancellationModel = Object.assign({}, this.futureMoneyCancellationForm.value);
      this.futureMoneyCancellationService
        .add(futureMoneyCancellationModel)
        .subscribe((response) => {
          this.toastrService.success(
            response.message, 'Başarılı');
          this.futureMoneyCancellationForm.reset();
          this.dialogRef.close('futuremoneycancellation');
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
