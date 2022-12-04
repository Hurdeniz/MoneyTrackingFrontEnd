import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MoneyOutputService } from 'src/app/services/money-output.service';

@Component({
  selector: 'app-money-output-delete',
  templateUrl: './money-output-delete.component.html',
  styleUrls: ['./money-output-delete.component.scss']
})
export class MoneyOutputDeleteComponent implements OnInit {
  totalAmount: number;

  constructor(
    private moneyOutputService: MoneyOutputService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<MoneyOutputDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.totalAmount=this.deleteData.totalAmount;
  }

  delete() {
    this.moneyOutputService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
