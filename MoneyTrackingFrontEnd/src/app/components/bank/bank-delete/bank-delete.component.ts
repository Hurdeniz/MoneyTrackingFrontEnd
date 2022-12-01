import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-bank-delete',
  templateUrl: './bank-delete.component.html',
  styleUrls: ['./bank-delete.component.scss']
})
export class BankDeleteComponent {
  bankName : string;

  constructor(
    private bankService: BankService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<BankDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.bankName=this.deleteData.bankName
  }

  delete() {
    this.bankService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }
}
