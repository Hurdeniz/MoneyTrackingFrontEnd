import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { MonetaryDeficitService } from 'src/app/services/monetary-deficit.service';

@Component({
  selector: 'app-monetary-deficit-delete',
  templateUrl: './monetary-deficit-delete.component.html',
  styleUrls: ['./monetary-deficit-delete.component.scss']
})
export class MonetaryDeficitDeleteComponent implements OnInit {
  nameSurname:string;
  amount: number;

  constructor(
    private monetaryDeficitService: MonetaryDeficitService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<MonetaryDeficitDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.nameSurname = this.deleteData.nameSurname;
    this.amount = this.deleteData.amount;
  }

  delete() {
    this.monetaryDeficitService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
