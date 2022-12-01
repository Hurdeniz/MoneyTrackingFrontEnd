import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffTaskService } from 'src/app/services/staff-task.service';

@Component({
  selector: 'app-staff-task-view',
  templateUrl: './staff-task-view.component.html',
  styleUrls: ['./staff-task-view.component.scss']
})
export class StaffTaskViewComponent {
  staffTaskForm: FormGroup;
  actionBtnName: string;
  dialogTitle: string;

  constructor(
    private staffTaskService: StaffTaskService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StaffTaskViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {

    this.actionBtnName = 'Kaydet';
    this.dialogTitle = 'Banka Ekle';
    this.createStaffTaskForm();

    if (!this.data.status) {
      this.editStaffTaskForm();
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Banka Güncelle';
    }
  }

  createStaffTaskForm() {
    if (this.data.status) {
      this.staffTaskForm = this.formBuilder.group({
        staffTaskName: ['', Validators.required],
      });
    } else if (!this.data.status) {
      this.staffTaskForm = this.formBuilder.group({
        staffTaskId: [this.data.row.staffTaskId],
        staffTaskName: ['', Validators.required],
      });
    }
  }

  editStaffTaskForm() {
    this.staffTaskForm.controls['staffTaskName'].setValue(this.data.row.staffTaskName);
  }

  statusControl() {
    if (this.data.status) {
      this.add();
    } else if (!this.data.status) {
      this.update();
    }
  }

  add() {
    if (this.staffTaskForm.valid) {
      let staffTaskModel = Object.assign({}, this.staffTaskForm.value);
      this.staffTaskService.add(staffTaskModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffTaskForm.reset();
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
    if (this.staffTaskForm.valid) {
      let staffTaskModel = Object.assign({}, this.staffTaskForm.value);
      this.staffTaskService.update(staffTaskModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffTaskForm.reset();
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
