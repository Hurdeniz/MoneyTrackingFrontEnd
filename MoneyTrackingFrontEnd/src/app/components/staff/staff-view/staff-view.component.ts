import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisode } from 'src/app/models/staffEpisode';
import { StaffTask } from 'src/app/models/staffTask';
import { StaffEpisodeService } from 'src/app/services/staff-episode.service';
import { StaffTaskService } from 'src/app/services/staff-task.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.scss']
})
export class StaffViewComponent implements OnInit {
staffTask:StaffTask[]=[];
staffEpisode:StaffEpisode[]=[];
  staffForm:FormGroup
  actionBtnName = 'Kaydet';
  dialogTitle = 'Yeni Personel';
  isAuthenticated: boolean = false;
  status:boolean=true;
  todayDate : Date = new Date();
  dateOfDismissal : string = new Date().toISOString();
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private staffService:StaffService,
    private staffTaskService:StaffTaskService,
    private staffEpisodeService:StaffEpisodeService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<StaffViewComponent>,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllStaffTask();
    this.getAllStaffEpisode();
    this.createStaffForm();
    if (this.editData) {
      this.editStaffForm();
    }
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

  createStaffForm() {
    if (!this.editData) {
      this.staffForm = this.formBuilder.group({
        identityNumber:['',Validators.required],
        nameSurname: ['',Validators.required],
        phone1: [''],
        phone2:[''],
        email:['',Validators.email],
        province:[''],
        district:[''],
        adress:[''],
        staffTaskId:['',Validators.required],
        staffEpisodeId:['',Validators.required],
        dateOfEntryIntoWork:['',Validators.required],
        dateOfDismissal:[this.dateOfDismissal],
        status:[this.status],
      });
    } else {
      this.staffForm = this.formBuilder.group({
        staffId:[this.editData.staffId],
        identityNumber:['',Validators.required],
        nameSurname: ['', Validators.required],
        phone1: [''],
        phone2:[''],
        email:['',Validators.email],
        province:[''],
        district:[''],
        adress:[''],
        staffTaskId:['',Validators.required],
        staffEpisodeId:['',Validators.required],
        dateOfEntryIntoWork:['',Validators.required],
        dateOfDismissal:[this.editData.dateOfDismissal],
        status:[this.editData.status],
      });
    }
  }

  editStaffForm() {
    this.actionBtnName = 'Güncelle';
    this.dialogTitle = 'Personel Güncelle';
    this.staffForm.controls['identityNumber'].setValue(this.editData.identityNumber);
    this.staffForm.controls['nameSurname'].setValue(this.editData.nameSurname);
    this.staffForm.controls['phone1'].setValue(this.editData.phone1);
    this.staffForm.controls['phone2'].setValue(this.editData.phone2);
    this.staffForm.controls['email'].setValue(this.editData.email);
    this.staffForm.controls['province'].setValue(this.editData.province);
    this.staffForm.controls['district'].setValue(this.editData.district);
    this.staffForm.controls['adress'].setValue(this.editData.adress);
    this.staffForm.controls['staffTaskId'].setValue(this.editData.staffTaskId);
    this.staffForm.controls['staffEpisodeId'].setValue(this.editData.staffEpisodeId);
    this.staffForm.controls['dateOfEntryIntoWork'].setValue(this.editData.dateOfEntryIntoWork);
  }

  add() {

    if (!this.editData) {
      debugger
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
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
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
    } else {
      this.update();
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
    }
    else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }



}
