import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisodeService } from 'src/app/services/staff-episode.service';

@Component({
  selector: 'app-staff-episode-delete',
  templateUrl: './staff-episode-delete.component.html',
  styleUrls: ['./staff-episode-delete.component.scss']
})
export class StaffEpisodeDeleteComponent {
  staffEpisodeName : string;

  constructor(
    private staffEpisodeService: StaffEpisodeService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<StaffEpisodeDeleteComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.staffEpisodeName=this.deleteData.staffEpisodeName
  }

  delete() {
    this.staffEpisodeService.delete(this.deleteData).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.dialogRef.close('delete');
    });
  }

}
