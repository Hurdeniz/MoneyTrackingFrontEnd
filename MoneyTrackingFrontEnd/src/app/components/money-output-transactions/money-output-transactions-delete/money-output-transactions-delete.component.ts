import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputService } from 'src/app/services/money-output.service';

@Component({
  selector: 'app-money-output-transactions-delete',
  templateUrl: './money-output-transactions-delete.component.html',
  styleUrls: ['./money-output-transactions-delete.component.scss']
})
export class MoneyOutputTransactionsDeleteComponent {
  userNameSurname :string;
  totalAmount: number;

  constructor(
    private moneyOutputService: MoneyOutputService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<MoneyOutputTransactionsDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userNameSurname=this.deleteData.userNameSurname
    this.totalAmount=this.deleteData.totalAmount;
  }

  delete() {
    this.moneyOutputService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
