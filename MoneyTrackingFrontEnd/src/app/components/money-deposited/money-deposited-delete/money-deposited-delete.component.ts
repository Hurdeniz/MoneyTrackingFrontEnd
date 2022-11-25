import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';

@Component({
  selector: 'app-money-deposited-delete',
  templateUrl: './money-deposited-delete.component.html',
  styleUrls: ['./money-deposited-delete.component.scss'],
})
export class MoneyDepositedDeleteComponent implements OnInit {
  bankName: string;
  amount: number;

  constructor(
    private moneyDepositedService: MoneyDepositedService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<MoneyDepositedDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.bankName = this.deleteData.bankName;
    this.amount = this.deleteData.amount;
  }

  delete() {
    this.moneyDepositedService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }
}
