import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { CentralPayService } from 'src/app/services/central-pay.service';

@Component({
  selector: 'app-central-pay-delete',
  templateUrl: './central-pay-delete.component.html',
  styleUrls: ['./central-pay-delete.component.scss'],
})
export class CentralPayDeleteComponent implements OnInit {
  amount: number;

  constructor(
    private centralPayService: CentralPayService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<CentralPayDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.amount = this.deleteData.amount;
  }

  delete() {
    this.centralPayService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }
}
