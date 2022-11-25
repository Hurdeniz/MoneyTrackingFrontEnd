import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
  futureAmount: number;
  amountPaid: number;
  answerAmountPaid: number;
  futureMoneyStatus: boolean;

  constructor(
    private incomingService:IncomingMoneyService,
    private futureMoneyService: FutureMoneyService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<IncomingMoneyDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.futureAmount=this.deleteData.futureAmount;
    this.amountPaid=this.deleteData.amountPaid;
    this.futureMoneyStatus=this.deleteData.status;
    console.log(this.deleteData)
  }

  delete() {
    this.futureMoneyService.delete(this.deleteData).subscribe((response) => {
  this.update();

    });
  }

  updateFutureMoneyForm() {
    this.futureMoneyForm = this.formBuilder.group({
      futureMoneyId: [this.deleteData.futureMoneyId],
      userId: [this.deleteData.userId],
      typeOfOperation: [this.deleteData.typeOfOperation],
      customerCode: [this.deleteData.customerCode],
      customerNameSurname: [this.deleteData.customerNameSurname],
      promissoryNumber: [this.deleteData.promissoryNumber],
      transactionAmount: [this.deleteData.transactionAmount],
      amountPaid: [this.amountPaid],
      futureAmount: [this.futureAmount],
      futureMoneyRegistrationDate: [this.deleteData.futureMoneyRegistrationDate],
      status: [this.futureMoneyStatus],
      description:[this.deleteData.futureMoneyDescription]
    });
  }

  update() {
    debugger
    if (this.futureMoneyForm.valid) {
      let futureMoneyModel = Object.assign({}, this.futureMoneyForm.value);
      this.futureMoneyService.update(futureMoneyModel).subscribe((response) => {
        this.toastrService.success('Gelen Ödeme Silinmiştir.', 'Başarılı');
        this.dialogRef.close('delete');
      });
    }
  }

  control() {
if(this.deleteData.status==false){
  this.futureAmount=this.deleteData.futureAmount+this.deleteData.incomingAmount;
     console.log(this.futureAmount);
     this.amountPaid=this.deleteData.amountPaid-this.deleteData.incomingAmount;
     console.log(this.amountPaid);
     this.futureMoneyStatus=true;
    this.updateFutureMoneyForm();
this.delete();

}else{
this.futureAmount=this.deleteData.futureAmount+this.deleteData.incomingAmount;
     console.log(this.futureAmount);
     this.amountPaid=this.deleteData.amountPaid-this.deleteData.incomingAmount;
     console.log(this.amountPaid);
    this.updateFutureMoneyForm();
this.delete();
}
  }

}
