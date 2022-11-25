import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { CardPaymentService } from 'src/app/services/card-payment.service';

@Component({
  selector: 'app-card-payment-delete',
  templateUrl: './card-payment-delete.component.html',
  styleUrls: ['./card-payment-delete.component.scss'],
})
export class CardPaymentDeleteComponent implements OnInit {
  bankName: string;
  amount: number;

  constructor(
    private cardPaymentService: CardPaymentService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<CardPaymentDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.bankName = this.deleteData.bankName;
    this.amount = this.deleteData.amount;
  }
  delete() {
    this.cardPaymentService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }
}
