import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffTaskService } from 'src/app/services/staff-task.service';

@Component({
  selector: 'app-staff-task-delete',
  templateUrl: './staff-task-delete.component.html',
  styleUrls: ['./staff-task-delete.component.scss']
})
export class StaffTaskDeleteComponent {
  staffTaskName : string;

  constructor(
    private staffTaskService: StaffTaskService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<StaffTaskDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.staffTaskName=this.deleteData.staffTaskName
  }

  delete() {
    this.staffTaskService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
