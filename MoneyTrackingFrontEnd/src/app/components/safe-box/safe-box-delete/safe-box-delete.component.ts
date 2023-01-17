import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SafeBoxService } from 'src/app/services/safe-box.service';

@Component({
  selector: 'app-safe-box-delete',
  templateUrl: './safe-box-delete.component.html',
  styleUrls: ['./safe-box-delete.component.scss']
})
export class SafeBoxDeleteComponent {


  constructor(
    private safeBoxService: SafeBoxService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<SafeBoxDeleteComponent>,
    private toastrService: ToastrService
  ) {}

  delete() {
    this.safeBoxService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
