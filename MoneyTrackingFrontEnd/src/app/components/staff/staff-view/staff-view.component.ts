import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisode } from 'src/app/models/staffEpisode';
import { StaffTask } from 'src/app/models/staffTask';
import { StaffEpisodeService } from 'src/app/services/staff-episode.service';
import { StaffTaskService } from 'src/app/services/staff-task.service';
import { StaffService } from 'src/app/services/staff.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.scss'],
})
export class StaffViewComponent implements OnInit {
  staffTask: StaffTask[] = [];
  staffEpisode: StaffEpisode[] = [];
  staffForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  actionBtnName: string;
  dialogTitle: string;
  status: boolean = true;

  constructor(
    private staffService: StaffService,
    private staffTaskService: StaffTaskService,
    private staffEpisodeService: StaffEpisodeService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StaffViewComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllStaffTask();
    this.getAllStaffEpisode();

    if (this.data.status) {
      this.dateNow = new FormControl(
        moment().format('YYYY-MM-DD'),
        Validators.required
      );
      this.dateInput = this.dateNow.value;
      this.actionBtnName = 'Kaydet';
      this.dialogTitle = 'Personel Ekle';
    } else if (!this.data.status) {
      this.dateNow = new FormControl(this.data.row.dateOfEntryIntoWork, Validators.required);
      this.dateInput = this.data.row.dateOfEntryIntoWork;
      this.actionBtnName = 'Güncelle';
      this.dialogTitle = 'Personel Güncelle';
    }
    this.getForms();
  }

  getAllStaffTask() {
    this.staffTaskService.getAll().subscribe((response) => {
      this.staffTask = response.data;
    });
  }
  getAllStaffEpisode() {
    this.staffEpisodeService.getAll().subscribe((response) => {
      this.staffEpisode = response.data;
    });
  }

  getForms() {
    this.createStaffForm();
    if (!this.data.status) {
      this.editStaffForm();
    }
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.staffForm.controls['dateOfEntryIntoWork'].setValue(this.dateInput);
  }

  createStaffForm() {
    if (this.data.status) {
      this.staffForm = this.formBuilder.group({
        identityNumber: ['', Validators.required],
        nameSurname: ['', Validators.required],
        phone1: [''],
        phone2: [''],
        email: ['', Validators.email],
        province: [''],
        district: [''],
        adress: [''],
        staffTaskId: ['', Validators.required],
        staffEpisodeId: ['', Validators.required],
        dateOfEntryIntoWork: [this.dateInput, Validators.required],
        dateOfDismissal: [this.dateInput],
        status: [this.status],
      });
    } else if (!this.data.status) {
      this.staffForm = this.formBuilder.group({
        staffId: [this.data.row.staffId],
        identityNumber: ['', Validators.required],
        nameSurname: ['', Validators.required],
        phone1: [''],
        phone2: [''],
        email: ['', Validators.email],
        province: [''],
        district: [''],
        adress: [''],
        staffTaskId: ['', Validators.required],
        staffEpisodeId: ['', Validators.required],
        dateOfEntryIntoWork: ['', Validators.required],
        dateOfDismissal: [this.data.row.dateOfDismissal],
        status: [this.data.row.status],
      });
    }
  }

  editStaffForm() {
    this.staffForm.controls['identityNumber'].setValue(
      this.data.row.identityNumber
    );
    this.staffForm.controls['nameSurname'].setValue(this.data.row.nameSurname);
    this.staffForm.controls['phone1'].setValue(this.data.row.phone1);
    this.staffForm.controls['phone2'].setValue(this.data.row.phone2);
    this.staffForm.controls['email'].setValue(this.data.row.email);
    this.staffForm.controls['province'].setValue(this.data.row.province);
    this.staffForm.controls['district'].setValue(this.data.row.district);
    this.staffForm.controls['adress'].setValue(this.data.row.adress);
    this.staffForm.controls['staffTaskId'].setValue(this.data.row.staffTaskId);
    this.staffForm.controls['staffEpisodeId'].setValue(
      this.data.row.staffEpisodeId
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
    if (this.staffForm.valid) {
      let staffModel = Object.assign({}, this.staffForm.value);
      this.staffService.add(staffModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffForm.reset();
          this.dialogRef.close('save');
        },
        (responseError) => {
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
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  update() {
    if (this.staffForm.valid) {
      let staffModel = Object.assign({}, this.staffForm.value);
      this.staffService.update(staffModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.staffForm.reset();
          this.dialogRef.close('update');
        },
        (responseError) => {
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
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }
}
