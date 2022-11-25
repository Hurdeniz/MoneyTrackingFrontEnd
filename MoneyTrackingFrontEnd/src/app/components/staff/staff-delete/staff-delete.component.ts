import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-delete',
  templateUrl: './staff-delete.component.html',
  styleUrls: ['./staff-delete.component.scss']
})
export class StaffDeleteComponent implements OnInit {
  nameSurname:string;
  constructor(
    private staffService: StaffService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<StaffDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.nameSurname=this.deleteData.nameSurname
  }

  delete() {
    this.staffService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
