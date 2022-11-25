import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { FutureMoneyDeleteComponent } from '../../future-money/future-money-delete/future-money-delete.component';

@Component({
  selector: 'app-future-money-transactions-delete',
  templateUrl: './future-money-transactions-delete.component.html',
  styleUrls: ['./future-money-transactions-delete.component.scss']
})
export class FutureMoneyTransactionsDeleteComponent implements OnInit {
  userNameSurname:string;
  userLastName:string;
  transactionAmount: number;
  customerNameSurname:string;

  constructor(
    private futureMoneyService: FutureMoneyService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<FutureMoneyTransactionsDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userNameSurname=this.deleteData.userNameSurname;
    this.transactionAmount = this.deleteData.transactionAmount;
    this.customerNameSurname=this.deleteData.customerNameSurname;
  }

  delete() {
    this.futureMoneyService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
