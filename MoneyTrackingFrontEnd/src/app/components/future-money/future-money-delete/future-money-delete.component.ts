import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyService } from 'src/app/services/future-money.service';

@Component({
  selector: 'app-future-money-delete',
  templateUrl: './future-money-delete.component.html',
  styleUrls: ['./future-money-delete.component.scss'],
})
export class FutureMoneyDeleteComponent implements OnInit {
  transactionAmount: number;
  customerNameSurname:string;

  constructor(
    private futureMoneyService: FutureMoneyService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<FutureMoneyDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
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
