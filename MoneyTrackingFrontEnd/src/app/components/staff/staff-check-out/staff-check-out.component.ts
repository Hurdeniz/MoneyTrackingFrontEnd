import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/services/staff.service';
import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-staff-check-out',
  templateUrl: './staff-check-out.component.html',
  styleUrls: ['./staff-check-out.component.scss'],
})
export class StaffCheckOutComponent {
  staffForm: FormGroup;
  dateNow: FormControl;
  dateInput: any;
  status: boolean = false;
  nameSurname:string;
  staffEpisodeName:string;
  staffTaskName:string;

  constructor(
    private staffService: StaffService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StaffCheckOutComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.nameSurname=this.data.nameSurname;
    this.staffEpisodeName=this.data.staffEpisodeName;
    this.staffTaskName=this.data.staffTaskName;
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;

    this.createStaffForm();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.staffForm.controls['dateOfDismissal'].setValue(this.dateInput);
  }

  createStaffForm() {
    this.staffForm = this.formBuilder.group({
      staffId: [this.data.staffId],
      identityNumber: [this.data.identityNumber],
      nameSurname: [this.data.nameSurname],
      phone1: [this.data.phone1],
      phone2: [this.data.phone2],
      email: [this.data.email],
      province: [this.data.province],
      district: [this.data.district],
      adress: [this.data.adress],
      staffTaskId: [this.data.staffId],
      staffEpisodeId: [this.data.staffEpisodeId],
      dateOfEntryIntoWork: [this.data.dateOfEntryIntoWork],
      dateOfDismissal: [this.dateInput, Validators.required],
      status: [this.status],
    });
  }

  update() {
    if (this.staffForm.valid) {
      let staffModel = Object.assign({}, this.staffForm.value);
      this.staffService.update(staffModel).subscribe(
        (response) => {
          this.toastrService.success('Personel Çıkışı Verilmiştir', 'Başarılı');
          this.staffForm.reset();
          this.dialogRef.close('checkout');
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
