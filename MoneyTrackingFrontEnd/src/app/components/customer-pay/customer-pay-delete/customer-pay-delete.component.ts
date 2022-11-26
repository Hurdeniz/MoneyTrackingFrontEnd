import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerPayService } from 'src/app/services/customer-pay.service';

@Component({
  selector: 'app-customer-pay-delete',
  templateUrl: './customer-pay-delete.component.html',
  styleUrls: ['./customer-pay-delete.component.scss']
})
export class CustomerPayDeleteComponent implements OnInit {
  amount: number;

  constructor(
    private customerPayService: CustomerPayService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<CustomerPayDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.amount = this.deleteData.amount;
  }

  delete() {
    this.customerPayService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
