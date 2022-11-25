import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { SatisfactionService } from 'src/app/services/satisfaction.service';

@Component({
  selector: 'app-satisfaction-delete',
  templateUrl: './satisfaction-delete.component.html',
  styleUrls: ['./satisfaction-delete.component.scss']
})
export class SatisfactionDeleteComponent implements OnInit {
  customerCode:string;
  customerNameSurname:String;

  constructor(
    private satisfactionService: SatisfactionService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<SatisfactionDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.customerCode=this.deleteData.customerCode;
    this.customerNameSurname=this.deleteData.customerNameSurname;
  }

  delete() {
    this.satisfactionService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
