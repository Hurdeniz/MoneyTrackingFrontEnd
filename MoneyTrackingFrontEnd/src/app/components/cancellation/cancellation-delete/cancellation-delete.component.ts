import { Component, Inject, OnInit } from '@angular/core';
import { CancellationService } from 'src/app/services/cancellation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancellation-delete',
  templateUrl: './cancellation-delete.component.html',
  styleUrls: ['./cancellation-delete.component.scss']
})
export class CancellationDeleteComponent implements OnInit {
  cancellationAmount:number;
  customerNameSurname:string

  constructor(
    private cancellationService: CancellationService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<CancellationDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.cancellationAmount=this.deleteData.cancellationAmount;
    this.customerNameSurname=this.deleteData.customerNameSurname;
  }
  delete() {
    this.cancellationService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
