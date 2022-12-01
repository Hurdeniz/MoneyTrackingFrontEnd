import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisodeService } from 'src/app/services/staff-episode.service';

@Component({
  selector: 'app-staff-episode-view',
  templateUrl: './staff-episode-view.component.html',
  styleUrls: ['./staff-episode-view.component.scss'],
})
export class StaffEpisodeViewComponent {
  staffEpisodeForm: FormGroup;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private staffEpisdeService: StaffEpisodeService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StaffEpisodeViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actionBtnName = 'Kaydet';
    this.dialogTitle = 'Bölüm Ekle';
    this.createStaffEpisodeForm();

    if (!this.data.status) {
      this.editStaffEpisodeForm();
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Bölüm Güncelle';
    }
  }

  createStaffEpisodeForm() {
    if (this.data.status) {
      this.staffEpisodeForm = this.formBuilder.group({
        staffEpisodeName: ['', Validators.required],
      });
    } else if (!this.data.status) {
      this.staffEpisodeForm = this.formBuilder.group({
        staffEpisodeId: [this.data.row.staffEpisodeId],
        staffEpisodeName: ['', Validators.required],
      });
    }
  }

  editStaffEpisodeForm() {
    this.staffEpisodeForm.controls['staffEpisodeName'].setValue(
      this.data.row.staffEpisodeName
    );
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    if (this.staffEpisodeForm.valid) {
      let staffEpisodeModel = Object.assign({}, this.staffEpisodeForm.value);
      this.staffEpisdeService.add(staffEpisodeModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffEpisodeForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  update() {
    if (this.staffEpisodeForm.valid) {
      let staffEpisodeModel = Object.assign({}, this.staffEpisodeForm.value);
      this.staffEpisdeService.update(staffEpisodeModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffEpisodeForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors == undefined) {
            this.toastrService.error(responseError.error, 'Dikkat');
          } else {
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
