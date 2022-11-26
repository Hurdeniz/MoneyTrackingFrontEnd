import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-expenditure-delete',
  templateUrl: './expenditure-delete.component.html',
  styleUrls: ['./expenditure-delete.component.scss'],
})
export class ExpenditureDeleteComponent implements OnInit {
  amount: number;

  constructor(
    private expenditureService: ExpenditureService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<ExpenditureDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.amount = this.deleteData.amount;
  }
  delete() {
    this.expenditureService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }
}
